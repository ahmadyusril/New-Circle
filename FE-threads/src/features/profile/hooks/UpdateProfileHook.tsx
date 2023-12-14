// import { ThreadPost } from "@/types/ThreadType";
// import { API } from "@/config/api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { ChangeEvent, useRef, useState } from "react";

// export function usePostThread() {
// 	const [form, setForm] = useState({
// 		nama: "",
//         description:"",
// 	});

// 	const QueryClient = useQueryClient();

// 	function handleChange(e: ChangeEvent<HTMLInputElement>) {
// 		setForm(
// 			 e.target.value,
// 		);
// 	}

// 	const { mutate: handlePost, isPending } = useMutation({
// 		mutationFn: async () => {
			
// 			await API.post("/thread", form);
// 		},
// 		onSuccess: () => {
// 			QueryClient.invalidateQueries({ queryKey: ["thread"] });
// 			setForm({
// 				nama: "",
//         description:"",
// 			});
// 		},
// 	});
// 	return {
// 		form,
// 		handleButtonClick,
// 		handleChange,
// 		handlePost,
// 		fileInputRef,
// 		isPending,
// 		setImage,
// 	};
// }
