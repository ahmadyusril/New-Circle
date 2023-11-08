import { HStack, Stack, Text } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
import { ThreadType } from "@/types/ThreadType";
import ThreadBase from "@/features/threads/components/ThreadBase";
import { useGetThread } from "@/features/threads/hooks/useGetThread";
import ThreadForm from "@/features/threads/components/ThreadForm";

function Home() {
  const { getThread, isLoading } = useGetThread();

  const [detail, setDetail] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(getThread);
  

  return (
    <>
      <>
        <Text color="white" fontSize="lg">
          Home
        </Text>
        <ThreadForm />
        <Stack mt={6}>
          {getThread &&
            getThread?.map((e: ThreadType) => (
              <ThreadBase
                key={e.id}
                id={e.id}
                content={e.content}
                image={e.image}
                user={e.user}
                replies={e.replies}
                likes={e.likes}
                created_at={e.created_at}
              />
            ))}
        </Stack>
      </>
    </>
  );
}

export default Home;
