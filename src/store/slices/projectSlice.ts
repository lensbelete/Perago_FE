import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProjectInterface {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const initialState = [] as ProjectInterface[];

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },

    removeProject: (state, action) => {
      const project = action.payload;
      state = state.filter(
        (projectInstance) => projectInstance.id != project.id
      );
    },

    addProjects: (state, action: PayloadAction<ProjectInterface[]>) => {
      const projects = action.payload;
      console.log("Here is the data I recieved : ", projects);
    },
  },
});

export const { addProject, removeProject, addProjects } = projectSlice.actions;

export default projectSlice.reducer;
