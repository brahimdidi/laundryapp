import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.product = action.payload;
        },
        incrementQuantity: (state, action) => {
            const itemExist = state.product.find((item) => item.id === action.payload.id);
            if (itemExist) {
                itemExist.quantity += 1 ;
            }
        },
        decrementQuantity: (state, action) => {
            const itemExist = state.product.find((item) => item.id === action.payload.id);
            if (itemExist.quantity > 1) {
                itemExist.quantity -= 1;
            } else {
                const removeItem = state.product.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem; 
            }
        }

    },
}); 

export const { setProducts, incrementQuantity, decrementQuantity } = productSlice.actions;
export default productSlice.reducer;