import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useFollowingData(id: number) {
	const { data: userFollowingData, isLoading } = useQuery({
		queryKey: ["following"],
		queryFn: async () => {
			const { data } = await API.get(`/follow/${id}`);
			console.log(data.data.followings);	

			return data.data.followings;
		},
	});

	return { userFollowingData, isLoading };
}

export function useFollowerData(id: number) {
	const { data: userFollowerData, isLoading, error } = useQuery({
		queryKey: ["follower"],
		queryFn: async () => {
			const { data } = await API.get(`/follow/${id}`);
			// console.log(data.data);

			return data.data.followers;
		},
	});

	return { userFollowerData, isLoading, error };
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
