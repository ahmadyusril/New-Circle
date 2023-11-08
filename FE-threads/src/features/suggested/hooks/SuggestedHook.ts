import { API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
	const { data: GetUser, isLoading, error } = useQuery({
		queryKey: ["userSuggestData"],
		queryFn: async () => {
			const { data } = await API.get("/users");
			console.log(data.data);

			return data.data;
		},
	});

	return { GetUser, isLoading, error };
}