import { Answers } from "./answer";

export class Post {

    id: number = 0;
    username: string = "";
    category: string = "";
    post: string = "";
    answers: Answers[] = [];
}