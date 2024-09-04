import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { fetchProjects, Project, removeProject, updateProject } from './ProjectsSlice';
import { useEffect, useState } from 'react';
import '../../index.css'

export const ProjectList = () => {
    const projects = useSelector((state: RootState) => state.projects);
    const dispatch = useAppDispatch();
    const [editProjectId, setEditProjectId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(fetchProjects())
    },[dispatch])

    const handleEditClick = (project: Project) => {
        setEditProjectId(project.id);
        setName(project.name);
        setDescription(project.description);
    };
    
    const handleUpdateClick = () => {
        if (editProjectId) {
            dispatch(updateProject({ id: editProjectId, name, description }));
            setEditProjectId(null);
            setName('');
            setDescription('');
        }
    };

    return (
        <div>
            <p>lista</p>
            <ul className='list-disc font-bold m-2'>
                {projects.map((project) => (
                    <li key={project.id} className='text-3xl font-bold underline'>
                        <p className='bg-slate-500'>hello</p>
                    {project.name} - {project.description}, stan: {project.state}....
                    <button onClick={() => dispatch(removeProject(project.id))}>Delete</button>
                    <button onClick={() => handleEditClick(project)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editProjectId && (
                <div>
                <h3>Edit Project</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project Name"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                />
                <button onClick={handleUpdateClick}>Update Project</button>
                </div>
            )}
        </div>
    );
};