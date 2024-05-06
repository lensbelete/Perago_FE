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
            // console.log("i might return something")

        },

        createTable: (state, action) => {
            const { newTable, projectId } = action.payload;
            const projectIndex = state.projects.findIndex(p => p.id === projectId);
            if (projectIndex !== -1) {
                state.projects[projectIndex].tables.push(newTable);
            }
        },

        createColumn: (state, action) => {
            const { newColumn, projectId, tableId } = action.payload;
            const project = state.projects.find(p => p.id === projectId);
            const table = project?.tables.find(t => t.id === tableId);
            if (table) {
                table.columns.push(newColumn);
            }
        },
        

    }
        
        
})


export const { createColumn,createProject, createTable} = workSpaceSlice.actions;

export default workSpaceSlice.reducer