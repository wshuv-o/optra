import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() data: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.createPost(data);
  }

  @Put('edit/:id')
  async editPost(@Param('id') id: number, @Body() data: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.updatePost(id, data);
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: number): Promise<{ message: string }> {
    await this.postService.deletePost(id);
    return { message: 'Post deleted successfully' };
  }

  @Get('all')
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('by-user/:userId')
  async getPostsByUserId(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postService.getPostsByUserId(userId);
  }

  @Get('by-id/:id')
  async getPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }
}
