import { Box, Card, Stack, Text, Avatar } from "@chakra-ui/react"
import SuggestedBase from "@/features/suggested/components/SuggestedBase"
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { API } from "@/config/api"

function SuggestedComponent() {
    

    return (
        <Card bg="whiteAlpha.200" p={4} >
            <Text color="white">Suggested for you</Text>
            <Box overflowY={"auto"} className="scroll" mt={3}>
                <Stack>
                    <SuggestedBase full_name="Muhammad Jawir" status="Follow" username="@jawiraja" />
                    <SuggestedBase full_name="Mursid Ngawi" status="Follow" username="@ngawimusical" />
                    <SuggestedBase full_name="Rusdi Bilek" status="Follow" username="@mamangrusdi69" />
                </Stack>
            </Box>
        </Card>
    )
}

export default SuggestedComponent