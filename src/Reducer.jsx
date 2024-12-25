import {createSlice, createAction} from "@reduxjs/toolkit"; 


const initialState ={
    isLoggedIn : false,
    cards : [],
    card:[],
    selectedcard: null,
    socket: null,
    userData: null,
}

// Create the clearUserData action
export const clearUserData = createAction('gl_variables/clearUserData');

const gl_variables = createSlice({
    name:'gl_variables',

    initialState,

    reducers:{
        setisLoggedIn: (state, action)=>{state.isLoggedIn = action.payload},
        setcards: (state, action) => {
            if (action.payload.type === "Order_Message_refresh") {
                // Handle refresh message
                state.cards = action.payload.Data;
            } else if (action.payload.type === "Order_Message") {
                // Handle new order message - wrap the data in the same structure
                state.cards.push({
                    Data: action.payload.Data
                });
            }
        },
        setcard: (state, action)=>{state.card = action.payload},
        setselectedcard:(state,action)=>{state.selectedcard = action.payload},
        setUserData: (state, action) => {
            return { ...state, userData: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearUserData, (state) => {
            state.userData = null;
            state.isLoggedIn = false;
            state.cards = [];
            state.card = [];
            state.selectedcard = null;
            state.socket = null;
        });
    },
})

export const {setisLoggedIn,setcards,setcard, setsocket, setselectedcard, setUserData} = gl_variables.actions
export default gl_variables.reducer;