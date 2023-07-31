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
        incrementProductQuantity: (state, action) => {
            const itemExist = state.product.find((item) => item.id === action.payload.id);
            if (itemExist) {
                itemExist.quantity ++ ;
            }
        },
        decrementProductQuantity: (state, action) => {
            const itemExist = state.product.find((item) => item.id === action.payload.id);
            if (itemExist.quantity == 1) {
                itemExist.quantity = 0;
                const removeItem = state.product.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem; 
            } else {
                itemExist.quantity -- ;
            }
        }

    },
}); 

export const { setProducts, incrementProductQuantity, decrementProductQuantity } = productSlice.actions;
export default productSlice.reducer;