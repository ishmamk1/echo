export interface Post {
    username: string; // Username of the user who created the post
    content: string; // Content of the post
    media: string[]; // List of media (URLs or image links)
    likes: string[]; // List of user IDs who liked the post
    comments: string[]; // List of comment IDs or user IDs who commented
    created: string; // Timestamp of when the post was created
}