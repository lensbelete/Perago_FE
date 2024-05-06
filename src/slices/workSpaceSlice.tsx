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
            const { newTable, projectId } = action.payload;
            const project = state.projects.find(p => p.id === projectId);
            if (project) {
                project.tables = [...project.tables, newTable];
            }
        },

    }
        
        
})


export const { createProject, createTable} = workSpaceSlice.actions;

export default workSpaceSlice.reducer