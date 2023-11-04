import { LikeType } from "./LikeType";
import { ReplyType } from "./ReplyType";
import { UserType } from "./UserType";

export type ThreadType = {
    id: number;
    content: string;
    image: string;
    user: UserType
    replies: ReplyType[];
    likes: LikeType[];
    created_at: string;
};

export type ThreadPost = {
	content: string;
	// image: string | Blob | MediaSource;
	// user: number;
};