import { createSlice } from "@reduxjs/toolkit";
import projects from "@/projects";


const initialState = {
    projects,
    loading: false,

}


const workSpaceSlice = createSlice({
    name: "workSpaces",
    initialState,
    reducers :{
        createProject : (state, action) => {
            state.projects.push(action.payload)
            console.log("i might return something")

        },

        createTable: (state, action) => {
            const { data, projectId } = action.payload;
            state.projects[projectId].tables.push(data)
          },

    }
        
        
})


export const { createProject, createTable} = workSpaceSlice.actions;

export default workSpaceSlice.reducer