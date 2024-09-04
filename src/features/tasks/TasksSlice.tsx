import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Task {
    id: string;
    projectId: string;
    title: string;
    completed: boolean;
}
const initialState: Task[] = [];

export const addTask = createAsyncThunk(
    'task/addTask',
    async(task: Omit<Task, 'id'>) => {
        const response = await fetch('www' , {
            method: 'POST',
            headers: {
                Authorozation: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: task,
            })
        });
        const data = await response.json();
        return {id: data.id, ...task};
    }
);
const taskSlice = createSlice({
    name: 'tasks',
    initialState: [] as Task[],
    reducers: {
        removeTask: ( state, action) => {
            return state.filter((task) => task.id !== action.payload);
        },
        updateTask: ( state, action) => {
            const index = state.findIndex((task) => task.id === action.payload.id);
            if(index !== -1) {
                state[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTask.fulfilled, (state,action) => {
            state.push(action.payload)
        });
    }
});

export const { removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;