import { createSlice } from "@reduxjs/toolkit"

// Reusable function to sync with localStorage
const saveToLocalStorage = (carts) => {
    localStorage.setItem("carts", JSON.stringify(carts))
}

const initialState = {
    carts: JSON.parse(localStorage.getItem("carts")) || [],
    coupon: JSON.parse(localStorage.getItem("coupon")) || ""
}

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addCart(state, action) {
            const cartIndex = state.carts.findIndex((c) => c.id === action.payload.id)
            if (cartIndex === -1) {
                state.carts.push({
                    id: action.payload.id,
                    title: action.payload.content.title,
                    price: action.payload.discount_price ?? action.payload.price,
                    thumbnail_image: action.payload.thumbnail_image,
                    quantity: 1
                })
            } else {
                state.carts[cartIndex].quantity += 1
            }
            saveToLocalStorage(state.carts)
        },

        removeCart(state, action) {
            state.carts = state.carts.filter((c) => c.id !== action.payload)
            saveToLocalStorage(state.carts)
        },

        clearCart(state) {
            state.carts = []
            localStorage.removeItem("carts")
        },

        increaseCart(state, action) {
            const cartIndex = state.carts.findIndex((c) => c.id === action.payload)
            state.carts[cartIndex].quantity += 1
            saveToLocalStorage(state.carts)
        },
        decreaseCart(state, action) {
            const cartIndex = state.carts.findIndex((c) => c.id === action.payload)
            state.carts[cartIndex].quantity -= 1
            saveToLocalStorage(state.carts)
        },
        setCoupon(state, action) {
            state.coupon = action.payload
            localStorage.setItem("coupon", JSON.stringify(action.payload))
        },
        removeCoupon(state, action) {
            state.coupon = ""
            localStorage.removeItem("coupon")
        }
    }
})

export default cartSlice.reducer
export const { addCart, removeCart, clearCart, increaseCart, decreaseCart, setCoupon, removeCoupon } = cartSlice.actions
