// import { API } from "@/libs/API";
// import { useQuery } from "@tanstack/react-query";

// export function useGetUser() {
// 	const {
// 		data: GetUser,
// 		isLoading,
// 		error,
// 	} = useQuery({
// 		queryKey: ["User"],
// 		queryFn: async () => {
// 			const { data } = await API.get("/user");
// 			return data.data;
// 		},
// 	});
// 	return {
// 		GetUser,
// 		isLoading,
// 		error,
// 	};
// }