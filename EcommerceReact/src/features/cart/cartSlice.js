import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    totalQuantuty:0,
    totalPrice:0,
    status:'idle',
    error: null
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id)
            if(existingItem){
                existingItem.quantity +=1;
            }else{
                state.items.push({...newItem, quantity:1});
            }
            state.totalQuantuty += 1;
            state.totalPrice += newItem.price;
        },
        removeFromCart:(state,action)=>{
            const id = action.payload;
            const existingItem =state.items.find((item) => item.id === id);
            if(existingItem){
                state.totalQuantuty -=existingItem.quantity;
                state.totalPrice -=existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        updateQuantity:(state,action)=>{
            const {id,quantity} =action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if(existingItem){
                state.totalQuantuty += (quantity-existingItem.quantity);
                state.totalPrice += (quantity - existingItem.quantity) *existingItem.price;
                existingItem.quantity = quantity;
            }
        },
        clearCart:(state) =>{
            state.items =[];
            state.totalQuantuty=0;
            state.totalPrice =0;
        }
    }
})

export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;