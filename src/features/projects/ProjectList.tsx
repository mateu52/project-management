import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { fetchProjects, Project, removeProject, updateProject } from './ProjectsSlice';
import { useEffect, useState } from 'react';
import '../../index.css'
import { TaskComponent } from './Task';

export const ProjectList = () => {
    const projects = useSelector((state: RootState) => state.projects);
    const dispatch = useAppDispatch();
    const [editProjectId, setEditProjectId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ showTaskComponent, setShowTaskComponent ] = useState(false);
    const [ showList, setShowList ] = useState(true)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

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
    const handleTask = (taskId :string | null) => {
        setShowTaskComponent(!showTaskComponent);
        setShowList(!showList);
        setSelectedTaskId(taskId);
    }
    console.log('projects:', projects)
    return (
        <div>
            {showList ? (
                <>
                <p>Lista projektów</p>
            <ul className='flex'>
                {projects.map((project) => (
                    <li key={project.id} className='p-2 border-solid border-2 border-t-green-200 border-b-green-600 mb-2 ml-2 w-96'>
                    {project.name}
                    <button onClick={() => dispatch(removeProject(project.id))} className='px-3 text-red-600'>Delete</button>
                    <button onClick={() => handleEditClick(project)} className='text-blue-600'>Edit</button>
                    <h3>Tasks:</h3>
                    {project.tasks.map((task) => (
                        <ul key={task.id}>
                            <li><button onClick={() =>handleTask(task.id)}>{task.fields.Task}</button></li>
                            
                        </ul>
                    ))}
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
            </>
            ): <TaskComponent handleTask={handleTask} taskId={selectedTaskId} />}
        </div>
    );
};