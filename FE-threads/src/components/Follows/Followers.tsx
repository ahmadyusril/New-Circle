import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useFollowerData } from "./useFollowing";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";

export default function Followers() {
  const auth = useSelector((state: RootState) => state.auth);

  const { userFollowerData } = useFollowerData(auth.id);

  const followers = userFollowerData;

  console.log(followers);
  return (
    <Box>
      <Card bgColor="gray.700" color="gray.100">
        <CardHeader>
          <Heading size="md">
            Your Followers: {followers?.followers?.length}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {followers?.map((follower: any) => {
              return (
                <Box key={follower.id}>
                  <Flex gap="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar src={follower.profile_picture} size="sm" />
                      <Box>
                        <Heading size="sm">{follower.full_name}</Heading>
                        <Text fontSize={"sm"} color={"whiteAlpha.500"}>
                          @{follower.username}
                        </Text>
                        <Text fontSize="sm">
                          {follower.profile_description
                            ? follower.profile_description
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
