import { SetAuthToken } from "@/config/api";
import { UserType } from "@/types/UserType";
import { createSlice } from "@reduxjs/toolkit";

const initiaslState: UserType = {
	id: 0,
	email: "",
	full_name: "",
	username: "",
	profile_picture: "",
	profile_description: "",
};

export const AuthSlice = createSlice({
	name: "auth",
	initialState: initiaslState,
	reducers: {
		AUTH_LOGIN: (_, action) => {
			const payload = action.payload;
			console.log(payload);
			SetAuthToken(payload.token);
			localStorage.setItem("token", payload.token);

			const user: UserType = {
				id: payload.id,
				email: payload.email,
				full_name: payload.full_name,
				username: payload.username,
				profile_description: payload.profile_description,
				profile_picture: payload.profile_picture,
			};

			return user;
		},
		AUTH_CHECK: (_, action) => {
			const payload = action.payload;

			const user: UserType = {
				id: payload.id,
				email: payload.email,
				full_name: payload.full_name,
				username: payload.username,
				profile_description: payload.profile_description,
				profile_picture: payload.profile_picture,
			};

			return user;
		},
		AUTH_ERROR: () => {
			localStorage.removeItem("token");
		},
		AUTH_LOGOUT: () => {
			localStorage.removeItem("token");
		},
	},
});