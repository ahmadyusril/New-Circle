import { ThreadType } from "./ThreadType";
import { UserType } from "./UserType";

export type ReplyType= {
    id: number;
    image: string;
    content: string;
    thread: ThreadType;
    user: UserType
};

export type PostReply={
    content: string;
    thread: number;
}

export type Replies = {
    id: number;
    content: string;
    image: string;
    user: UserType;
    thread: ThreadType
    created_at: string;
}
