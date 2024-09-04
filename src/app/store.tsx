import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/ProjectsSlice';
import tasksReducer from '../features/tasks/TasksSlice';
import usersReducer from '../features/users/UsersSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        users: usersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;