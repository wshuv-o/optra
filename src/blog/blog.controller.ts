import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('connect')
  async connectBloggingPlatform(
    @Query('platform') platform: string,
    @Query('userId') userId: string,
  ) {
    if (!platform || !userId) {
      throw new HttpException(
        'Platform and userId are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const blogs = await this.blogService.fetchBlogs(platform, userId);
      return { platform, userId, blogs };
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
