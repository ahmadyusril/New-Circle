import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetFollow() {
	const {
		data: userFollowData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["following"],
		queryFn: async () => {
			const { data } = await API.get("/user");
			return data;
		},
	});

	return {
		userFollowData,
		isLoading,
		error,
	};
}
