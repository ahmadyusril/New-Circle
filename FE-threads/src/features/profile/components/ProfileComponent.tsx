import { Avatar, Box, Button, Card, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import { RootState } from "@/store/type/RootState"
import { useSelector } from "react-redux"
import Spinner from "@/components/Spinner";
import { useGetUser } from "../hooks/ProfileHook";

export default function ProfileComponent() {
    const user = useSelector((state: RootState) => state?.auth);
    console.log(user);
    const { GetUser, isLoading } = useGetUser();

    if (isLoading) {
        return <Spinner />
    }
    const { following, follower } = GetUser

    return (
        <Card bg="whiteAlpha.200" p={4}>
            <Text color="white">My Profile</Text>
            <Box
                pos="relative"
                h="70px"
                mt={3}
                rounded="xl"
                bgImage= {"https://genshin.honeyhunterworld.com/img/furina_089_gacha_splash.webp?x76042"}
            >
                <Box
                    pos="absolute"
                    bottom={-6}
                    left={4}
                    p={1}
                    bg="blackAlpha.800"
                    rounded="full"
                >
                    <Avatar size="xl" name={user.full_name} src={user.profile_picture} />
                </Box>
            </Box>
            <Flex justify="right" mt={-6}>
                <Button
                    color="white"
                    size="xs"
                    rounded="full"
                    variant="outline"
                    mt={8}
                    w="fit-content"
                    _hover={{ bg: 'gray' }}
                >
                    Edit Profile
                </Button>
            </Flex>

            <Stack spacing={0}>
                <Text mt={3} fontSize="lg" fontWeight="semibold" color="white">
                    ✨{user.full_name}✨
                </Text>
                <Text fontSize='xs' color='whiteAlpha.600'>@{user.username}</Text>
                <Text fontSize='sm' color='whiteAlpha.800'>{user.profile_description}</Text>
                <HStack mt={2} fontSize='sm'>
                    <HStack>
                        <Text color='whiteAlpha.800'>{following?.length}</Text>
                        <Text color='whiteAlpha.600'>Following</Text>
                    </HStack>
                    <HStack>
                        <Text color='whiteAlpha.800'>{follower?.length}</Text>
                        <Text color='whiteAlpha.600'>Followers</Text>
                    </HStack>
                </HStack>
            </Stack>
        </Card>
    )
}