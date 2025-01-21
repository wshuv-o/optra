import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BlogService {
  async fetchBlogsFromDevTo(username: string) {
    try {
      const { data } = await axios.get(`https://dev.to/api/articles?username=${username}&state=all`);
      return data;
    } catch (error) {
      return {message: `Failed to fetch blogs from Medium for user: ${username}` };
    }
  }

  async fetchBlogsFromMedium(username: string) {
    try {
      return `Fetching blogs for ${username} from Medium is not yet implemented.`;
    } catch (error) {
      return {message: `Failed to fetch blogs from Medium for user: ${username}`};
    }
  }

  async fetchBlogs(platform: string, userId: string) {
    switch (platform.toLowerCase()) {
      case 'devto':
        return this.fetchBlogsFromDevTo(userId);
      case 'medium':
        return this.fetchBlogsFromMedium(userId);
      default:
        return {message: "error occured!"};
    }
  }
}
