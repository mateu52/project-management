import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addTask } from './TasksSlice';

export const TaskForm = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ title, projectId, completed }));
    setTitle('');
    setProjectId('');
    setCompleted(false);
  };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
        />
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            <option value="">Select Project</option>
            {projects.map((project) => (
            <option key={project.id} value={project.id}>
                {project.name}
            </option>
            ))}
        </select>
        <label>
            <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
        </label>
        <button type="submit">Add Task</button>
        </form>
    );
};