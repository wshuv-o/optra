"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let BlogService = class BlogService {
    async fetchBlogsFromDevTo(username) {
        try {
            const { data } = await axios_1.default.get(`https://dev.to/api/articles?username=${username}&state=all`);
            return data;
        }
        catch (error) {
            return { message: `Failed to fetch blogs from Medium for user: ${username}` };
        }
    }
    async fetchBlogsFromMedium(username) {
        try {
            return `Fetching blogs for ${username} from Medium is not yet implemented.`;
        }
        catch (error) {
            return { message: `Failed to fetch blogs from Medium for user: ${username}` };
        }
    }
    async fetchBlogs(platform, userId) {
        switch (platform.toLowerCase()) {
            case 'devto':
                return this.fetchBlogsFromDevTo(userId);
            case 'medium':
                return this.fetchBlogsFromMedium(userId);
            default:
                return { message: "error occured!" };
        }
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)()
], BlogService);
//# sourceMappingURL=blog.service.js.map