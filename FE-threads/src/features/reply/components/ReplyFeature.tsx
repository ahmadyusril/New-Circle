/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Box, Flex, Grid, HStack, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { ReplyType } from "@/types/ReplyType";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useGetReply } from "../hooks/GetReplyHook";


function ReplyFeature() {
    const { getreply } = useGetReply();

    return (

        <Grid width={"full"}>
            <Flex gap={3} borderBottom='1px solid gray' mt={100}>
                <Avatar size="sm" src={"user?.profile_picture"} />
                <Box mb={4}>
                    <HStack>
                        <Text
                            display="flex"
                            gap={1}
                            fontSize="xl"
                            fontWeight="medium"
                            color="whiteAlpha.800"
                            cursor='pointer'
                        >
                            {"user?.full_name"}

                            <Text fontWeight="light" display="flex" color="whiteAlpha.600" fontSize={"sm"} alignItems={"center"}>
                                @{"user?.username"} <BsDot color="gray" size={24} />
                                {/* {time} */}
                            </Text>
                        </Text>
                    </HStack>

                    <Text fontSize="md" color="whiteAlpha.800" fontWeight={"normal"} mb={2}>
                        {"content"}
                    </Text>
                </Box>
            </Flex>
        </Grid>
    );
}

export default ReplyFeature;