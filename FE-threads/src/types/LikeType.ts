import { ThreadType } from "./ThreadType";
import { UserType } from "./UserType";

export type LikeType = {
    id: number;
    thread: ThreadType;
    user: UserType;
};