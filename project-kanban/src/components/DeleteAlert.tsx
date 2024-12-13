import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import { useTasks } from "../hooks/useTasks";


interface idDelete {
    id: number
}


export default function DeleteAlert(props: idDelete) {

    const { deleteTask } = useTasks()

    const handleDelete = (id: number) => {
        deleteTask(id)
    }


    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button style={{ cursor: "pointer" }} color="red">Excluir</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="24rem" >
                <Flex justify="between" direction={"column"} gap="7">
                    <Box>
                        <Dialog.Title>Excluir Tarefa</Dialog.Title>
                        <Dialog.Description>
                            Esta ação é irreversível. Tem certeza de que deseja excluir esta tarefa?
                        </Dialog.Description>
                    </Box>


                    <Flex gap={"9"} justify={"center"} >
                        <Dialog.Close>
                            <Button style={{ cursor: "pointer" }} color="gray" variant="soft">Cancelar</Button>
                        </Dialog.Close>
                        <Button style={{ cursor: "pointer" }} onClick={() => handleDelete(props.id)}>Confirmar</Button>
                    </Flex>
                </Flex>
            </Dialog.Content>


        </Dialog.Root>
    );
}