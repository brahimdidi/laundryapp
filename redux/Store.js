import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";
import ProductReducer from "./ProductReducer";
import PreviousPreferenceReducer from "./PreviousPreferencesReducer";

export default configureStore({
    reducer: {
        cart: cartReducer,
        product: ProductReducer,
        previousPreferences: PreviousPreferenceReducer,
    },
});