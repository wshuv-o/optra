import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(data: Partial<Post>): Promise<Post> {
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }

  async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, data);
    return this.postRepository.findOne({ where: { id } });
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async getPostsByUserId(userId: string): Promise<Post[]> {
    return this.postRepository.find({ where: { user_id: userId } });
  }
}
