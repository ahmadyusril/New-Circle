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