import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    connectBloggingPlatform(platform: string, userId: string): Promise<{
        platform: string;
        userId: string;
        blogs: any;
    }>;
}
