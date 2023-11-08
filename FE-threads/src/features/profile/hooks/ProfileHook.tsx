import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
	const { data: GetUser, isLoading, error } = useQuery({
		queryKey: ["User"],
		queryFn: async () => {
			const { data } = await API.get("/user/auth");
			console.log(data.data);

			return data.data;
		},
	});

	return { GetUser, isLoading, error };
}