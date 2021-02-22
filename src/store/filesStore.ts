import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

type filesStore = Array<File>;

const filesSlice = createSlice({
  name: 'files',
  initialState: [] as filesStore,
  reducers: {
    SetFiles: (state, action: PayloadAction<filesStore>) => action.payload,
  },
});

const store = configureStore({ reducer: filesSlice.reducer });

const { actions } = filesSlice;
const { SetFiles } = actions;

export { SetFiles, store };
