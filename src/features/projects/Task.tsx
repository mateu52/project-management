import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Task } from "./ProjectsSlice";

interface TaskComponentProps {
    taskId: string | null;
    handleTask: (taskId: string | null) => void;
}
interface RootState {
    tasks: Task[];
    // inne stany...
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const TaskComponent = ({handleTask, taskId} : TaskComponentProps) => {
    const task = useTypedSelector((state) => 
        state.tasks.find((t) => t.id === taskId)
    );
    if (!task) {
        return <p>Task not found</p>;
    }
    console.log(task)
    return (
        <div>
            <p>nazwa taska:</p>
            <button onClick={() => handleTask(null)}>close</button>
        </div>
    )
}