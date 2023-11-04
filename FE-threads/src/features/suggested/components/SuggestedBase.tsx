import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react"
import { useState } from 'react'

interface IProps {
    full_name: string
    username: string
    status: string
}
function SuggestedBase(props: IProps) {
    const { full_name, status, username } = props

    const [follow, setFollow] = useState(false)
    function handleFollow() {
        setFollow(!follow)
    }
    return (
        <HStack justify='space-between' >
            <HStack spacing={3}>
            <Avatar size="md" src="https://static01.nyt.com/images/2020/05/27/us/27georgefloyd/27georgefloyd-videoSixteenByNineJumbo1600.jpg" />
                <Stack spacing={-4}>
                    <Text fontSize='xs' color='white'>{full_name}</Text>
                    <Text color='whiteAlpha.600' fontSize='xs'>{username}</Text>
                </Stack>
            </HStack>
            <Button _hover={{ bg: 'whatsapp' }} onClick={handleFollow} variant='outline' rounded='full' color={follow ? "white" : 'whiteAlpha.700'} size='sm'>{follow ? status : 'Following'}</Button>
        </HStack>
    )
}

export default SuggestedBase