import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetReply() {
    
    const {
        data: getReplies,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["replies"],
        // queryFn: async () => await API.get("/threads").then((res) => res.data),
        queryFn: async () => {
            const { data } = await API.get(`/replies`);
            return data.data;
        },
        // refetchInterval: 100

    });
    return { getReplies, refetch, isLoading };
}