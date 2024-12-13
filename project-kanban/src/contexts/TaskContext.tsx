import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../entities/Task";
import { taskService } from "../services/api";


export interface TasksContextData {
    tasks: Task[],
    createTask: (attributes: Omit<Task, "id">) => Promise<void>,
    updateTask: (id: number, attributes: Partial<Omit<Task, "id">>) => Promise<void>,
    deleteTask: (id: number) => Promise<void>
}

export const TaskContext = createContext({} as TasksContextData)

interface TasksContextProviderProps {
    children: ReactNode
}

export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({ children }) => {

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        taskService.fetchTasks().then((data) => {
            setTasks(data)
        })
    }, [])

    const createTask = async (attributes: Omit<Task, "id">) => {
        const newTask = await taskService.createTask(attributes)
        setTasks((currentState) => {
            const updatedTasks = [...currentState, newTask]
            return updatedTasks
        })
    }

    const updateTask = async (id: number, attributes: Partial<Omit<Task, "id">>) => {
        await taskService.updateTask(id, attributes)
        setTasks((currentState) => {
            const updatedTasks = [...currentState]
            const taskIndex = updatedTasks.findIndex((task) =>task.id === id)
            Object.assign(updatedTasks[taskIndex], attributes)
            return updatedTasks
        })
    }

    const deleteTask = async (id: number) => {
        await taskService.deleteTask(id)
        setTasks((currentState) => currentState.filter((task) => task.id !== id))
    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}