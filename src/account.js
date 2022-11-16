import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    accounts: [],
    count : 1,
  },
  reducers: {
    add: (state, action) => {
        state.accounts.push({ ...action.payload});
        state.count += 1;
    },
    remove: (state, action) => {
      const index = state.accounts.findIndex((item) => item.key === action.payload);
      state.accounts.splice(index, 1);
      state.count -= 1;
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = accountSlice.actions

export default accountSlice.reducer