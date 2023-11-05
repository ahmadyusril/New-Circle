import FollowsTab from "@/components/Follows/FollowsTab";
import { Heading } from "@chakra-ui/react";
// import FollowsTab from "../features/Follows/FollowsTab";

export default function Follows() {
  return (
    <>
      <Heading color={"gray.100"} size="xl" pb={8}>
        Follows
      </Heading>
      <FollowsTab />
    </>
  );
}








// import { Box, Flex } from "@chakra-ui/react";
// import { useParams } from "react-router-dom";
// import Navbar from "@/components/Navbar/Navbar";
// import ProfilePage from "@/components/ProfilePage/Profile";

// const DetailProfile = () => {
//   const { username } = useParams();

//   return (
//     <Box bg={"black"}>
//       <Flex color={"white"} p={"20px"} gap={4}>
//         <Box flex={"1"}>
//           <Navbar />
//         </Box>
//         <Box flex={"2"}>
//           <ProfilePage username={username} />
//         </Box>
//         <Box flex={"1"}>
//           <Sidebar />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default DetailProfile;
