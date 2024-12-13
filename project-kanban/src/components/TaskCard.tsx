import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Task, TaskPriority, TaskStatus } from "../entities/Task";
import { useTasks } from "../hooks/useTasks";
import { Pencil1Icon } from "@radix-ui/react-icons";
import TaskForm from "./TaskForm";
import DeleteAlert from "./DeleteAlert";

interface TaskCardProps {
    task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {

    const {  updateTask } = useTasks()

    const getActionText = (status: TaskStatus) => {
        const actionsTexts = {
            "todo": "Iniciar",
            "doing": "Concluir",
            "done": "Arquivar"
        }

        return actionsTexts[status]
    }


    const getActionColor = (status: TaskStatus) => {
        const actionsColor: { [key: string]: "indigo" | "green" | "bronze" } = {
            "todo": "indigo",
            "doing": "green",
            "done": "bronze"
        }

        return actionsColor[status]
    }



    const getPriorityColor = (priority: TaskPriority) => {
        const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
            "low": "sky",
            "medium": "amber",
            "high": "tomato"
        }

        return priorityColors[priority]
    }

    

    const handleUpdate = () => {
        if (task.status === 'todo') {
            updateTask(task.id, { status: "doing" })
        } else if (task.status === 'doing') {
            updateTask(task.id, { status: "done" })
        }
    }


    return (
        <Card>
            <Flex justify={"between"}>
                <Flex align={'center'} gap={'4'}>
                    <Heading as="h3" size={'3'}>{task.title}</Heading>
                    <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </Flex>
                <TaskForm openChange={true} content={task}>
                    <Pencil1Icon />
                </TaskForm>

            </Flex>

            <Text as="p" my={"4"}>{task.description}</Text>

            <Flex gap={'2'}>
                {task.status !== "done" && (
                    <Button style={{ cursor: "pointer" }} color={getActionColor(task.status)} onClick={() => handleUpdate()}>{getActionText(task.status)}</Button>
                )}
               <DeleteAlert id={task.id}/>
            </Flex>
        </Card>
    );
}