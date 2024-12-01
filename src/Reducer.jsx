import {createSlice} from "@reduxjs/toolkit"; 


const initialState ={
    isLoggedIn : false,
    cards : [],
    card:[],
    selectedcard: null,
}


const gl_variables = createSlice({
    name:'gl_variables',

    initialState,

    reducers:{
        setisLoggedIn: (state, action)=>{state.isLoggedIn = action.payload},
        setcards: (state, action) => {
            // If action.payload is an array (for refreshing cards)
            if (Array.isArray(action.payload)) {
              state.cards = action.payload;
            } else if (action.payload) {
              // Append a new card if action.payload is an object (new card)
              state.cards.push(action.payload);
            }
          },
        setcard: (state, action)=>{state.card = action.payload},
        setselectedcard:(state,action)=>{state.selectedcard = action.payload},
    }
})

export const {setisLoggedIn,setcards,setcard, setsocket, setselectedcard} = gl_variables.actions
export default gl_variables.reducer;