import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Typ projektu
export interface Project {
  id: string;
  name: string;
  description: string;
  state: string;
}
interface ApiProject {
  id: string;
  fields: {
    name: string;
    description: string;
    state: string;
  };
}

// Inicjalny stan
const initialState: Project[] = []; 

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await fetch('https://api.airtable.com/v0/app0OwqInWRNrNUgx/Projects', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    console.log(data)
    return data.records.map((record: ApiProject) => ({
      id: record.id,
      name: record.fields.name,
      description: record.fields.description,
      state: record.fields.state
    }));
  }
);
// Thunk do dodawania projektu
export const addProject = createAsyncThunk(
  'projects/addProject',
  async ({ name, description}: Omit<Project, 'id'>) => {
    const response = await fetch(`https://api.airtable.com/v0/app0OwqInWRNrNUgx/Projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {name, description }
      }),
    });
    const data = await response.json();
    return { id: data.id, name, description }; 
  }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        removeProject: (state, action) => {
        return state.filter((project) => project.id !== action.payload);
        },
        updateProject: (state, action) => {
        const index = state.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
            state[index] = action.payload;
        }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects.fulfilled, (state, action) => {
          return action.payload;
        })
        .addCase(addProject.fulfilled, (state, action) => {
        state.push(action.payload);
        });
    },
});

export const { removeProject, updateProject } = projectsSlice.actions;

export default projectsSlice.reducer;