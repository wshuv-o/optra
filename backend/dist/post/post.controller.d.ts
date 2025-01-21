import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(data: Partial<PostEntity>): Promise<PostEntity>;
    editPost(id: number, data: Partial<PostEntity>): Promise<PostEntity>;
    deletePost(id: number): Promise<{
        message: string;
    }>;
    getAllPosts(): Promise<PostEntity[]>;
    getPostsByUserId(userId: string): Promise<PostEntity[]>;
    getPostById(id: number): Promise<PostEntity>;
}
