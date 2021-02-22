import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

type resultStore = String;

const resultSlice = createSlice({
  name: 'result',
  initialState: '' as resultStore,
  reducers: {
    SetResult: (state, action: PayloadAction<resultStore>) => action.payload,
  },
});

const store = configureStore({ reducer: resultSlice.reducer });

const { actions } = resultSlice;
const { SetResult } = actions;

export { SetResult, store };
