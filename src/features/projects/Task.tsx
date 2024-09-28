import { Project, TypTaskComponent } from "./ProjectsSlice";

interface TaskComponentProps {
    task: TypTaskComponent | null;
    project: Project | null;
    handleTask: (taskId: string | null, projectId: string | null) => void;
}

export const TaskComponent = ({handleTask, task, project} : TaskComponentProps) => {
    console.log('task',task,'project', project)
    //const members = project?)
    
    
    //console.log(members)
    return (
        <div>
            <p>nazwa taska:</p>
            <button onClick={() => handleTask(null, null)}>close</button>
            <h2>{task?.fields.Task}</h2>
            <p>przypisani : {
                task?.fields.assignedTo.map((member) => (
                    <p key={member.id}>{member.name}</p>
                ))
                }</p>
            
        </div>
    )
}