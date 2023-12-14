// import { API } from "@/config/api";
// import { RootState } from "@/store/type/RootState";
// import {
// 	Avatar,
// 	Box,
// 	Button,
// 	Card,
// 	Flex,
// 	HStack,
// 	Stack,
// 	Text,
// } from "@chakra-ui/react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// function DetailProfile() {
// 	const { id } = useParams();
// 	const user = useSelector((state: RootState) => state.auth);
// 	const userId = Number(id);
// 	// console.log(userId);

// 	const { data: detailProfile } = useQuery({
// 		queryKey: ["detailProfile"],
// 		queryFn: async () => {
// 			const { data } = await API.get(`/user/${userId}`);
// 			console.log(data.data);

// 			return data.data;
// 		},
// 	});
// 	console.log(detailProfile);

// 	const isFollow = detailProfile.followers.some((follow: any) => {
// 		return follow.id === user.id;
// 	});
// 	// console.log(isFollow);

// 	const mutation = useMutation({
// 		mutationFn: (detailProfileFollow) => {
// 			return API.post(`/follow/${id}`, detailProfileFollow);
// 		},
// 	});

// 	return (
// 		<Box display="flex" flexDirection="column" gap={5}>
// 			<Card bg="whiteAlpha.200" p={4} minW="400px">
// 				<Box
// 					pos="relative"
// 					h="70px"
// 					mt={3}
// 					rounded="xl"
// 					bg="linear-gradient(to top, #96fbc4 0%, #f9f586 100%)">
// 					<Box
// 						pos="absolute"
// 						bottom={"-60px"}
// 						left={4}
// 						p={1}
// 						bg="blackAlpha.800"
// 						rounded="full">
// 						<Avatar
// 							w={"100px"}
// 							h={"100px"}
// 							src={detailProfile?.profile_picture}
// 						/>
// 					</Box>
// 				</Box>
// 				<Flex justify="right" mt="10px">
// 					{isFollow ? (
// 						<Button
// 							borderRadius={"full"}
// 							h={"28px"}
// 							fontSize={"14px"}
// 							onClick={() => mutation.mutate()}>
// 							Unfollow
// 						</Button>
// 					) : (
// 						<Button
// 							borderRadius={"full"}
// 							h={"28px"}
// 							fontSize={"14px"}
// 							onClick={() => mutation.mutate()}>
// 							Follow
// 						</Button>
// 					)}
// 				</Flex>

// 				<Stack spacing={0} mt={"50px"}>
// 					<Flex gap={4}>
// 						<Flex align={"center"}>
// 							<Text mt={3} fontSize="2xl" fontWeight="semibold" color="white">
// 								{detailProfile?.full_name}
// 							</Text>
// 						</Flex>
// 						<Flex align={"center"} mt={"6px"}>
// 							<Text mt={3} fontSize="lg" color="whiteAlpha.600">
// 								@{detailProfile?.username}
// 							</Text>
// 						</Flex>
// 					</Flex>
// 					<Text fontSize="sm" color="whiteAlpha.800">
// 						{!detailProfile?.bio ? (
// 							<Text>Bio Kosong</Text>
// 						) : (
// 							<Text>{detailProfile?.bio}</Text>
// 						)}
// 					</Text>
// 					<HStack fontSize={"md"} mt={"50px"}>
// 						<HStack>
// 							<Text color="whiteAlpha.800">
// 								{detailProfile?.followings?.length}
// 							</Text>
// 							<Text color="whiteAlpha.600">Following</Text>
// 						</HStack>
// 						<HStack>
// 							<Text color="whiteAlpha.800">
// 								{detailProfile?.followers.length}
// 							</Text>
// 							<Text color="whiteAlpha.600">Followers</Text>
// 						</HStack>
// 					</HStack>
// 				</Stack>
// 			</Card>
// 		</Box>
// 	);
// }

// export default DetailProfile;
