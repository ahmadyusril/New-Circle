import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { API } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../hooks/SuggestedHook";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";

export default function SuggestedBase({
  user_id,
  full_name,
  username,
  profile_picture,
  following,
  follower,
}: any) {
  const [follow, setFollow] = useState({
    user: user_id,
  });
  const signInUser = useSelector((state: RootState) => state?.auth);
  const { GetUser, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post(`follow`, follow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Suggest"] });
      queryClient.invalidateQueries({ queryKey: ["User"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleClick() {
    setFollow({ user: user_id });
    handleFollow();
  }
  if (isLoading) return <div>Loading....</div>;

  // const { following } = GetUser;
  // console.log("ini following",GetUser);
  

  const isFollowing = follower.some((follow: any) => follow.id === signInUser.id);
  console.log("ini follower",follower);
  
  return (
    <HStack justify="space-between">
      <HStack spacing={3}>
        <Avatar size="md" src={profile_picture} />
        <Stack spacing={-4}>
          <Text fontSize="xs" color="white">
            {full_name}
          </Text>
          <Text color="whiteAlpha.600" fontSize="xs">
            @{username}
          </Text>
        </Stack>
      </HStack>
      <Button
        _hover={{ bg: "whatsapp" }}
        onClick={handleClick}
        variant="outline"
        rounded="full"
        color={isFollowing ? "white" : "whiteAlpha.700"}
        size="sm"
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </HStack>
  );
}
