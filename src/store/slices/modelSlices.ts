import { createSlice } from "@reduxjs/toolkit";

interface ModelInterface {
  id: string;
  project_id: string;
  name: string;
}

const initialState = [] as ModelInterface[];

const modelSlice = createSlice({
  name: "modelsSlice",
  initialState,
  reducers: {
    addModel: (state, action) => {
      state.push(action.payload);
    },
    removeModel: (state, action) => {
      const model = action.payload;
      state = state.filter((modelInstance) => modelInstance.id != model.id);
    },
    addModels: (state, action) => {
      const models = action.payload;
      state.concat(models);
    },
  },
});

export const { addModel, removeModel, addModels } = modelSlice.actions;
export default modelSlice.reducer;
