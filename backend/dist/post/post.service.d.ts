import { Repository } from 'typeorm';
import { Post } from './post.entity';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    createPost(data: Partial<Post>): Promise<Post>;
    updatePost(id: number, data: Partial<Post>): Promise<Post>;
    deletePost(id: number): Promise<void>;
    getAllPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post>;
    getPostsByUserId(userId: string): Promise<Post[]>;
}
