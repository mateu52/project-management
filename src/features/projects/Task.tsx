import { Project, Task } from "./ProjectsSlice";

interface TaskComponentProps {
    task: Task | null;
    project: Project | null;
    handleTask: (task: Task |null, project: Project| null) => void;
}

export const TaskComponent = ({handleTask, task, project} : TaskComponentProps) => {
    console.log(task, project)
    return (
        <div>
            <p>nazwa taska:</p>
            <button onClick={() => handleTask(null, null)}>close</button>

        </div>
    )
}