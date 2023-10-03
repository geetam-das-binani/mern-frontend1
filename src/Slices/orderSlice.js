import {createSlice} from '@reduxjs/toolkit'
const initialState={
   
    order:{},
    error:null

}

const newOrderReducer=createSlice({
    name:'order',
    initialState:initialState,
    reducers:{
        createOrderSuccess:(state,{payload})=>{
            
            state.order=payload
        },
        createOrderFail:(state,{payload})=>{
            
            state.error=payload

        },
        clearOrderError:(state)=>{
            state.error=null
        }
    }

})

export default newOrderReducer.reducer
export const {createOrderFail,createOrderSuccess,clearOrderError}=newOrderReducer.actions
