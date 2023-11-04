/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useGetThreadDetail } from "@/features/threaddetail/hooks/GetThreadDetailHook";
import {
	AbsoluteCenter,
	Avatar,
	Box,
	Button,
	Divider,
	HStack,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import FormReplyFeature from "@/features/reply/components/FormReplyFeature";

export default function ThreadDetail() {
	const navigate = useNavigate();

	const { getThreadDetail, isLoading } = useGetThreadDetail();
console.log(getThreadDetail);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Box>
			<Box color={"gray.100"}>
				<Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
					<Heading size="xl" pb={8}>
						Thread Replies
					</Heading>
					<Button onClick={() => navigate(-1)}>Back</Button>
				</Box>
				<HStack>
					<Box>
						<HStack>
							<Avatar
								name={getThreadDetail.user.full_name}
								src={getThreadDetail.user.profile_picture}
								size="sm"
								mr="3"
								_hover={{
									cursor: "pointer",
								}}
							/>
							<Box display={"flex"} alignItems={"center"} gap={1}>
								<Text
									fontWeight="semibold"
									fontSize={"md"}
									_hover={{
										cursor: "pointer",
									}}
								>
									{getThreadDetail.user.full_name}
								</Text>
								<Text
									ml={1} fontWeight="light" display="flex" color="whiteAlpha.600" fontSize={"xs"} alignItems={"center"}
								>
									@{getThreadDetail.user.username}
								</Text>
							</Box>
							<Text color="gray.600">&bull;</Text>
						</HStack>
						<Box ms="3rem">
							{getThreadDetail.image && (
								<Box mt="0.5rem">
									<Image
										boxSize="300px"
										objectFit="cover"
										src={getThreadDetail.image}
										alt="Dan Abramov"
										rounded="md"
									/>
								</Box>
							)}

							<Box my="10">
								<Text fontSize="xl">{getThreadDetail.content}</Text>
							</Box>
							<Box>
								<HStack fontSize="xs">
									<HStack>
										<BsHeart />
										<Text>{getThreadDetail.likes.length}</Text>
									</HStack>

									<HStack>
										<BiMessageAltDetail />
										<Text>{getThreadDetail.replies.length} Replies</Text>
									</HStack>
								</HStack>
							</Box>
						</Box>
					</Box>
				</HStack>

				<Box position="relative" padding="10">
					<Divider />
					<AbsoluteCenter bg="gray.800" px="4">
						Replies
					</AbsoluteCenter>
				</Box>
			</Box>
			<FormReplyFeature threadReply={getThreadDetail} />
		</Box>
		);
	}