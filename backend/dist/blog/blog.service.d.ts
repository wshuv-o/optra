export declare class BlogService {
    fetchBlogsFromDevTo(username: string): Promise<any>;
    fetchBlogsFromMedium(username: string): Promise<string | {
        message: string;
    }>;
    fetchBlogs(platform: string, userId: string): Promise<any>;
}
