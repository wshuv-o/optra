import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BlogService {
  async fetchBlogsFromDevTo(username: string) {
    try {
      const { data } = await axios.get(`https://dev.to/api/articles?username=${username}&state=all`);
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch blogs from Dev.to for user: ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchBlogsFromMedium(username: string) {
    try {
      // Medium's API is not public; scraping or third-party libraries might be needed.
      // Example: Placeholder for fetching from Medium.
      return `Fetching blogs for ${username} from Medium is not yet implemented.`;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch blogs from Medium for user: ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchBlogs(platform: string, userId: string) {
    switch (platform.toLowerCase()) {
      case 'devto':
        return this.fetchBlogsFromDevTo(userId);
      case 'medium':
        return this.fetchBlogsFromMedium(userId);
      default:
        throw new HttpException(
          'Unsupported blogging platform',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
