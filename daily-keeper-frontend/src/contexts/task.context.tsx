import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../common/task";


export const TaskContext = createContext({} as TaskContextProps);

interface Props {
    children?: React.ReactNode;
}

interface TaskResponse {
    _embedded: {
        tasks: Task[];
    }     
}

interface TaskContextProps {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, content: string, tagId: number, date: Date) => void;
    updateTaskStates: (id: string, checked: boolean, importance: boolean, urgency: boolean) => void;
}

function TasksProvider({children} : Props) {
    const[tasks, setTasks] = useState<Task[]>([]);

    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask].sort((a, b) => a.date < b.date ? -1 : 1));
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, content: string, tagId: number, date: Date) => {
        const newTasks = tasks.map(task => {
            if(task.id === id) {
                task.id = id;
                task.content = content;
                task.tagId = tagId;
                task.date = date;
            }
            return task;
        });
        setTasks(newTasks);
    }

    const updateTaskStates = (id: string, checked: boolean, importance: boolean, urgency: boolean) => {
        const newTasks = tasks.map(task => {
            if(task.id === id) {
                return { ...task, isDone: checked, isImportant: importance, isUrgent: urgency };
            }
            return task;
        });
        setTasks(newTasks);
    }

    useEffect(() => {
        axios.get<TaskResponse>('/api/tasks').then(
            res => {
                console.log('task data: ', res.data)
                setTasks(res.data._embedded.tasks.sort((a, b) => a.date < b.date ? -1 : 1));
            },
            err => {
                console.log(err);
            }
        )
    }, []);

    return (
        <TaskContext.Provider 
            value={{tasks, addTask, deleteTask, updateTask, updateTaskStates}}
        >
            {children}
        </TaskContext.Provider>
    );
}

export default TasksProvider;