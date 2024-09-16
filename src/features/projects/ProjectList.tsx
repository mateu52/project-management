import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { fetchProjects, Project, removeProject, TeamMember, updateProject } from './ProjectsSlice';
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
        //setName(project.name);
        //setDescription(project.description);
    };
    
    const handleUpdateClick = () => {
        if (editProjectId) {
            dispatch(updateProject({ id: editProjectId, name, description }));
            setEditProjectId(null);
            setName('');
            setDescription('');
        }
    };
    console.log('projects:', projects)
    return (
        <div>
            <p>lista</p>
            <ul className=''>
                {projects.map((project) => (
                    <li key={project.id} className='p-2 border-solid border-2 border-t-green-200 border-b-green-600 mb-2 ml-2 w-96'>
                    {project.name} - {project.id}
                    <button onClick={() => dispatch(removeProject(project.id))} className='px-3 text-red-600'>Delete</button>
                    <button onClick={() => handleEditClick(project)} className='text-blue-600'>Edit</button>
                    <h3>Tasks:</h3>
                    
                    </li>
                ))}
            </ul>
            {editProjectId && (
                <div className='border-solid border-2 border-blue-200 w-80 ml-2 pl-2'>
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
                    <button onClick={handleUpdateClick} className='font-bold'>Update Project</button>
                </div>
            )}
        </div>
    );
};