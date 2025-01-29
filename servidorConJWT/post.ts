import { Comment } from "./comment";

export class Post {

    id: number = 0;
    username: string = "";
    category: string = "";
    post: string = "";
    comments: Comment[] = [];
    date: Date = new Date();
}