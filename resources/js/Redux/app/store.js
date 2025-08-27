import { configureStore } from "@reduxjs/toolkit";
import PageReducer from "@/Redux/features/pages/Page/page";
import CartReducer from "@/Redux/features/Cart/cart"
import Customize from "@/Redux/features/pages/Customize/customize";

export const store = configureStore({
    reducer: {
        pages: PageReducer,
        customize: Customize,
        carts: CartReducer,
    },
    devTools: true,
});
