import { Box, Card, Stack, Text, Avatar } from "@chakra-ui/react"
import SuggestedBase from "@/features/suggested/components/SuggestedBase"

function SuggestedComponent() {
    return (
        <Card bg="whiteAlpha.200" p={4} >
            <Text color="white">Suggested for you</Text>
            <Box mt={3}>
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