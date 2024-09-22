import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Typ użytkownika
export interface User {
    id: string;
    name: string;
    role: string;
}

// Inicjalny stan
const initialState: User[] = [];

// Thunk do dodawania użytkownika
export const addUser = createAsyncThunk(
    'users/addUser',
    async (user: Omit<User, 'id'>) => {
        const response = await fetch(`https://api.airtable.com/v0/YOUR_BASE_ID/users`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: user,
        }),
        });
        const data = await response.json();
        return { id: data.id, ...user }; 
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        removeUser: (state, action) => {
        return state.filter((user) => user.id !== action.payload);
        },
        updateUser: (state, action) => {
        const index = state.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
            state[index] = action.payload;
        }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.fulfilled, (state, action) => {
        state.push(action.payload);
        });
    },
});

export const { removeUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
