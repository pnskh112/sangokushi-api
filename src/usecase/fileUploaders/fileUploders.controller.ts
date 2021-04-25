import { Get, Post } from "@nestjs/common";
import { UseInterceptors,UploadedFile,Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { Express } from 'express'
import multer from "multer";

@Controller()
export class  FileUploders{
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      console.log(file);
      return {
        "file": file,
      };
    }

    @Get('upload/:filename')
    @UseInterceptors(FileInterceptor('file'))
    getFile(@UploadedFile() file: Express.Multer.File) {
      console.log(file);
    }
}