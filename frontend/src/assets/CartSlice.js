import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    id: [],
  },
  reducers: {
    addItem: (state, action) => {
      let obj = action.payload;
      let id = obj.id;

      const existingItem = state.items.find((item) => item.obj.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ obj, quantity: 1 });
        state.id.push(id);
      }
    },
    removeItem: (state, action) => {
      let id = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.obj.id != id);
      state.id = state.id.filter(existingId => existingId !== id);

    },
    clearAll: (state, action) => {
      state.items.length = 0;
      state.id.length = 0 ;
    }, increaseQuantity: (state, action) => {
      let id = action.payload;

      const existingItem = state.items.find((item) => item.obj.id === id);

      existingItem.quantity += 1;
    }, decreseQuantity: (state, action) => {
      let id = action.payload;

      const existingItem = state.items.find((item) => item.obj.id === id);

      existingItem.quantity -= 1;

      if (existingItem.quantity == 0) {
       state.items =  state.items.filter((item) => id != item.obj.id);
        
        state.id = state.id.filter(existingId => existingId != id);
      }
    },sortIncresing : (state , action)=>{
      
    state.items.sort((cartObj1 , cartObj2 )=>{
        return cartObj2.obj.rating - cartObj1.obj.rating;
      })
    },sortDecresing : (state , action)=>{
      state.items.sort((cartObj1 , cartObj2 )=>{
        return cartObj1.obj.rating - cartObj2.obj.rating;
      })
    }
  },
});

export const { addItem, removeItem, clearAll, increaseQuantity, decreseQuantity , sortDecresing , sortIncresing} = cartSlice.actions;

export default cartSlice.reducer;
