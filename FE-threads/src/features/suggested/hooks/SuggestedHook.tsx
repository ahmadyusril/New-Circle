import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
	const { data: GetUser, isLoading, error } = useQuery({
		queryKey: ["Suggest"],
		queryFn: async () => {
			const { data } = await API.get("/users");

			return data.data;
		},
	});

	return { GetUser, isLoading, error };
}