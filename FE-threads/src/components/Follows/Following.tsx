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
import Spinner from "../Spinner";
import { useFollowingData } from "./useFollowing";
import { RootState } from "@/store/type/RootState";
import { useSelector } from "react-redux";

export default function Following() {
  const auth = useSelector((state: RootState) => state.auth);
  const { userFollowingData, isLoading } = useFollowingData(auth.id);

  if (isLoading) return <Spinner />;

  const following = userFollowingData;

  return (
    <Box>
      <Card bgColor="gray.700" color="gray.100">
        <CardHeader>
          <Heading size="md">
            Users that you follow: {following?.length}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {following?.map((following: any) => (
              <Box key={following.id}>
                <Flex gap="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar src={following.profile_picture} size="sm" />
                    <Box>
                      <Heading size="sm">{following.full_name}</Heading>
                      <Text fontSize={"sm"} color={"whiteAlpha.500"}>
                        @{following.username}
                      </Text>
                      <Text fontSize="sm">
                        {following.profile_description
                          ? following.profile_description
                          : "Tidak ada deskripsi profil"}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex alignItems={"center"}></Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
