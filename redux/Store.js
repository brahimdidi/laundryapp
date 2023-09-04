import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";
import ProductReducer from "./ProductReducer";
import PreviousPreferenceReducer from "./PreviousPreferencesReducer";
import UserReducer from "./UserReducer";

export default configureStore({
    reducer: {
        user: UserReducer,
        cart: cartReducer,
        product: ProductReducer,
        previousPreferences: PreviousPreferenceReducer,
    },
});