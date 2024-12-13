import { Badge, Flex, Grid, ScrollArea } from "@radix-ui/themes"
import { Task } from "../entities/Task"
import { TaskCard } from "./TaskCard"
import { useTasks } from "../hooks/useTasks"


export default function TaskBoard() {

   const { tasks } = useTasks()

  
    const taskTodo: Task[] = tasks.filter(task => task.status === 'todo') ?? []
    const taskInProgress: Task[] = tasks.filter(task => task.status === 'doing') ?? []
    const taskDone: Task[] = tasks.filter(task => task.status === 'done') ?? []

    return (
        <ScrollArea scrollbars="horizontal">
            <Grid columns={'3'} gap={'4'} minWidth={'64rem'}>
                <Flex direction={"column"} gap={'4'}>
                    <Badge size={'3'} color="red">
                        Para Fazer ({taskTodo.length})
                    </Badge>

                    {taskTodo.map((task) => <TaskCard key={task.id} task={task} />)}
                </Flex>

                <Flex direction={"column"} gap={'4'}>
                    <Badge size={'3'} color="yellow">
                        Em Progresso ({taskInProgress.length})
                    </Badge>

                    {taskInProgress.map((task) => <TaskCard key={task.id} task={task} />)}
                </Flex>

                <Flex direction={"column"} gap={'4'}>
                    <Badge size={'3'} color="green">
                        Concluídas ({taskDone.length})
                    </Badge>

                    {taskDone.map((task) => <TaskCard key={task.id} task={task} />)}
                </Flex>
            </Grid>
        </ScrollArea>
    )
}