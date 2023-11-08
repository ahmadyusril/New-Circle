import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { API } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../hooks/SuggestedHook";

export default function SuggestedBase({
  user_id,
  full_name,
  username,
  profile_picture,
}: any) {
  const [followId, setFollowId] = useState({
    user_id: user_id,
  });

  const { GetUser, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post(`follow`, followId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      queryClient.invalidateQueries({ queryKey: ["User"] });
      queryClient.invalidateQueries({ queryKey: ["Follow"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleClick() {
    setFollowId({ user_id: user_id });
    handleFollow();
  }
  if (isLoading) return <div>Loading....</div>;

  const { following } = GetUser;

  const isFollowing = following.some((follow: any) => follow.id === user_id);

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
