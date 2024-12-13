import { Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes";
import { FormEventHandler, ReactNode } from "react";
import { z } from "zod";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../entities/Task";

const CreateTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"])
})

interface propsForm {
    openChange: boolean
    content?: Task
    children: ReactNode
}

export default function TaskForm(props: propsForm) {

    const { createTask, updateTask } = useTasks()


    const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)

        const title = formData.get("title")
        const description = formData.get("description")
        const status = formData.get("status")
        const priority = formData.get("priority")

        ev.currentTarget.reset()

        const data = CreateTaskSchema.parse({ title, description, status, priority })


        if (!props.openChange) {
            await createTask(data)
        } else {
            if (props.content?.id !== undefined) {
                await updateTask(props.content.id, data)
            } else {

                console.log("error")
            }

        }



    }
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button style={{ cursor: "pointer" }}>
                    {props.children}
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="32rem">
                <Dialog.Title>Nova Tarefa</Dialog.Title>
                <Dialog.Description size="2" mb="4">Adicione novas tarefas ao quadro</Dialog.Description>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">
                        <Box maxWidth="32rem">
                            <Box mb="2">
                                <Text as="label" htmlFor="title">Título</Text>
                            </Box>
                            <TextField.Root placeholder="Defina um título" name="title" id="title" defaultValue={props.openChange ? props.content?.title : '' }  autoFocus required />
                        </Box>

                        <Box maxWidth="32rem">
                            <Box mb="2">
                                <Text as="label" htmlFor="description">Descrição</Text>
                            </Box>
                            <TextArea placeholder="Descreva a tarefa" name="description" id="description" defaultValue={props.openChange ? props.content?.description : '' } required />
                        </Box>

                        <Flex gap="8">
                            <Box>
                                <Text as="div" mb="2">Situação</Text>
                                <RadioGroup.Root name="status" defaultValue={props.openChange ? props.content?.status : 'todo' }>

                                    <RadioGroup.Item value="todo">
                                        <Badge color="red">
                                            Para Fazer
                                        </Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="doing">
                                        <Badge color="yellow">
                                            Em progresso
                                        </Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="done">
                                        <Badge color="green">
                                            Concluída
                                        </Badge>
                                    </RadioGroup.Item>

                                </RadioGroup.Root>
                            </Box>

                            <Box>
                                <Text as="div" mb="2">Prioridade</Text>
                                <RadioGroup.Root name="priority" defaultValue={props.openChange ? props.content?.priority : 'low' }>

                                    <RadioGroup.Item value="low" >
                                        <Badge color="sky" >
                                            Baixa
                                        </Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="medium">
                                        <Badge color="amber">
                                            Média
                                        </Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="high">
                                        <Badge color="tomato">
                                            Alta
                                        </Badge>
                                    </RadioGroup.Item>

                                </RadioGroup.Root>
                            </Box>
                        </Flex>

                        <Flex gap="2" justify="end">
                            <Dialog.Close>
                                <Button style={{ cursor: "pointer" }} color="gray" variant="soft">Cancelar</Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button style={{ cursor: "pointer" }} type="submit">{props.openChange ? "Atualizar" : "Criar Tarefa"}</Button>
                            </Dialog.Close>

                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}