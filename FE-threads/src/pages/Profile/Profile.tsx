import { API } from "@/config/api";
import { RootState } from "@/store/type/RootState";
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
import { useSelector } from "react-redux";

function Profile() {
	const detailProfile = useSelector((state: RootState) => state?.auth); 
	// const { data: Profile } = useQuery({
	// 	queryKey: ["profile"],
	// 	queryFn: async () => {
	// 		const { data } = await API.get(`/user/auth`);
	// 		return data;
	// 	},
	// });
	// console.log(Profile);

	return (
		<Box display="flex" flexDirection="column" gap={5}>
			<Card bg="whiteAlpha.200" p={4} minW="400px">
				<Text color="white">Profile</Text>
				<Box
					pos="relative"
					h="70px"
					mt={3}
					rounded="xl"
					bg="https://i.pximg.net/img-master/img/2022/07/26/11/02/03/100004753_p0_master1200.jpg"
					>
					<Box
						pos="absolute"
						bottom={"-60px"}
						left={4}
						p={1}
						bg="blackAlpha.800"
						rounded="full">
						<Avatar w={"100px"} h={"100px"} src={detailProfile?.profile_picture} />
					</Box>
				</Box>

				<Stack spacing={0} mt={"50px"}>
					<Flex gap={4}>
						<Flex align={"center"}>
							<Text mt={3} fontSize="2xl" fontWeight="semibold" color="white">
								{detailProfile?.full_name}
							</Text>
						</Flex>
						<Flex align={"center"} mt={"6px"}>
							<Text mt={3} fontSize="lg" color="whiteAlpha.600">
								@{detailProfile?.username}
							</Text>
						</Flex>
					</Flex>
					<Text fontSize="sm" color="whiteAlpha.800">
						{!detailProfile?.profile_description ? (
							<Text>Bio Kosong</Text>
						) : (
							<Text>{detailProfile?.profile_description}</Text>
						)}
					</Text>
					<HStack fontSize={"md"} mt={"50px"}>
						<HStack>
							<Text color="whiteAlpha.800">{detailProfile?.following?.length}</Text>
							<Text color="whiteAlpha.600">Following</Text>
						</HStack>
						<HStack>
							<Text color="whiteAlpha.800">{detailProfile?.followers?.length}</Text>
							<Text color="whiteAlpha.600">Followers</Text>
						</HStack>
					</HStack>
				</Stack>
			</Card>
		</Box>
	);
}

export default Profile;
