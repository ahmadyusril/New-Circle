import { API } from "@/config/api";
import {
	Avatar,
	Box,
	Card,
	Flex,
	HStack,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

function Profile(id: number) {
	const { data: Profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data } = await API.get(`/user/${id}`);
			return data.data;
		},
	});
	// console.log(Profile);

	return (
		<Box display="flex" flexDirection="column" gap={5}>
			<Card bg="whiteAlpha.200" p={4} minW="400px">
				<Box
					pos="relative"
					h="70px"
					mt={3}
					rounded="xl"
					bg="linear-gradient(to top, #96fbc4 0%, #f9f586 100%)">
					<Box
						pos="absolute"
						bottom={"-60px"}
						left={4}
						p={1}
						bg="blackAlpha.800"
						rounded="full">
						<Avatar w={"100px"} h={"100px"} src={Profile?.profile_picture} />
					</Box>
				</Box>

				<Stack spacing={0} mt={"50px"}>
					<Flex gap={4}>
						<Flex align={"center"}>
							<Text mt={3} fontSize="2xl" fontWeight="semibold" color="white">
								{Profile?.full_name}
							</Text>
						</Flex>
						<Flex align={"center"} mt={"6px"}>
							<Text mt={3} fontSize="lg" color="whiteAlpha.600">
								@{Profile?.username}
							</Text>
						</Flex>
					</Flex>
					<Text fontSize="sm" color="whiteAlpha.800">
						{!Profile?.bio ? (
							<Text>Bio Kosong</Text>
						) : (
							<Text>{Profile?.profile_description}</Text>
						)}
					</Text>
					<HStack fontSize={"md"} mt={"50px"}>
						<HStack>
							<Text color="whiteAlpha.800">{Profile?.followings?.length}</Text>
							<Text color="whiteAlpha.600">Following</Text>
						</HStack>
						<HStack>
							<Text color="whiteAlpha.800">{Profile?.followers.length}</Text>
							<Text color="whiteAlpha.600">Followers</Text>
						</HStack>
					</HStack>
				</Stack>
			</Card>
		</Box>
	);
}

export default Profile;
