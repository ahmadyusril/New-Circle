import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetFollowing() {
    const {
        data: getFollowing,
        refetch,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["following"],
        // queryFn: async () => await API.get("/threads").then((res) => res.data),
        queryFn: async () => {
            const { data } = await API.get("/user/auth");
            return data.data;
        },
    });
    return { getFollowing, refetch, isLoading, isError };
}

export function useGetFollower() {
    const {
        data: getFollower,
        refetch,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["follower"],
        // queryFn: async () => await API.get("/threads").then((res) => res.data),
        queryFn: async () => {
            const { data } = await API.get("/user/auth");
            return data.data;
        },
    });
    return { getFollower, refetch, isLoading, isError };
}

// export function Follow() {
// 	const { userFollowData } = useFollowData();
// 	const userId = userFollowData.id;
// 	const mutation = useMutation({
// 		mutationFn: (Follow) => {
// 			return API.post(`/follow/${userId}`, Follow);
// 		},
// 	});
// 	return mutation;
// }
