import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInformation: localStorage.getItem('userInformation')?JSON.parse(localStorage.getItem('userInformation')):null,
  },
  reducers: {
    userLoginInfo: (state,action) => {
        state.userInformation=action.payload
    },
    
  },
})

export const { userLoginInfo} = userSlice.actions

export default userSlice.reducer