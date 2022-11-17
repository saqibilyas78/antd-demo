import { createSlice } from '@reduxjs/toolkit'

const findNestedAccountObject = (array, key) => {
  let account;

  for (const obj of array) {
    if (obj.key === key) {
      account = obj;
    } else if (obj.children !== undefined) {
      account = findNestedAccountObject(obj.children, key);
    }
    if (account !== undefined) {
      break;
    }
  }

  return account;
}

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    accounts: [],
    count : 1,
  },
  reducers: {
    add: (state, action) => {
        // const itemExists = state.accounts.find((item) => item.key === action.payload.parent);
        const itemExists = findNestedAccountObject(state.accounts, action.payload.parent)
        console.log(itemExists);
        if(itemExists){
          itemExists.children.push({ ...action.payload});
        }else{
          state.accounts.push({ ...action.payload});
        }
        state.count += 1;
    },
  },
})

// Action creators are generated for each case reducer function
export const { add } = accountSlice.actions

export default accountSlice.reducer