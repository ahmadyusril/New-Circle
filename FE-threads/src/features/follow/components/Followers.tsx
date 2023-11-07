import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useGetFollower } from "../hooks/FollowsHook";
import Spinner from "@/components/Spinner";

export default function Followers() {
  const { getFollower, isLoading } = useGetFollower();
  if (isLoading) return <Spinner />;

  // const { followers } = getFollower;
  // console.log(followers);

  return (
    <Box>
      <Card bgColor="gray.700" color="gray.100">
        <CardHeader>
          <Heading size="md">
            Your Followers: {getFollower?.data?.followers?.length}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {getFollower?.follower?.map((follower: any) => {
              return (
                <Box key={follower?.id}>
                  <Flex gap="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={follower?.full_name}
                        src={follower?.profile_picture}
                        size="sm"
                      />
                      <Box>
                        <Heading size="sm">{follower?.full_name}</Heading>
                        <Text fontSize={"sm"} color={"whiteAlpha.500"}>
                          @{follower?.username}
                        </Text>
                        <Text fontSize="sm">
                          {follower?.profile_description
                            ? follower?.profile_description
                            : "Tidak ada deskripsi profil"}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex alignItems={"center"}></Flex>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
