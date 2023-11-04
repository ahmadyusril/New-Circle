// import { API } from "@/config/api";
// import { RootState } from "@/store/type/RootState";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// export function usePostLike() {

// 	const [like, setLike] = useState({
// 		thread: id,
// 	});

// 	const userId = useSelector((state: RootState) => state.auth.user.id);

// 	const queryClient = useQueryClient();

// 	const { mutate: handleLike } = useMutation({
// 		mutationFn: () => {
// 			return API.post(`like`, like);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({
// 				queryKey: ["threads"],
// 			});
// 		},
// 		onError: (error) => {
// 			console.log(error);

// 		}
// 	});

// 	function handleClick() {
// 		setLike({ thread: id });
// 		handleLike();
// 	}

// 	const { isOpen, onOpen, onClose } = useDisclosure();
// }
