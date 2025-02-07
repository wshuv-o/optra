import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Public } from 'src/auth/public.decorator';

@Controller('upload')
export class UploadController {
  @Post()
  @Public()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Save files in 'uploads' folder
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtName = extname(file.originalname);
          const fileName = `${uniqueSuffix}${fileExtName}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;
    return { imageUrl };
  }
}
