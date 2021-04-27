import { Get, Post, UploadedFiles } from "@nestjs/common";
import { UseInterceptors,UploadedFile,Controller } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express/multer";
import { Express } from 'express'
import { diskStorage } from "multer";
import { editFileName } from "src/utils/editFileName.utils";
import { imageFileFilter } from "src/utils/file-uploading.utils";

@Controller()
export class  FileUploders{
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    ) 
    async uploadedFile(@UploadedFile() file) {
        console.log("aaaa");
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }
  
    @Post('multiple')
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
      const response = [];
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response;
    }
    // @Post('upload')
    // @UseInterceptors(
    //     FileInterceptor('image'),
    // )
    // async uploadedFile(@UploadedFile() file) {
    //     const response = {
    //         originalname: file.originalname,
    //         filename: file.filename,
    //     };
    //     console.log("response",response);
    //     return response;
    // }

    // @Post('multiple')
    // @UseInterceptors(
    //   FilesInterceptor('image', 20, {
    //     storage: diskStorage({
    //       destination: './files',
    //       filename: editFileName,
    //     }),
    //     fileFilter: imageFileFilter,
    //   }),
    // )
    // async uploadMultipleFiles(@UploadedFiles() files) {
    //   const response = [];
    //   files.forEach(file => {
    //     const fileReponse = {
    //       originalname: file.originalname,
    //       filename: file.filename,
    //     };
    //     response.push(fileReponse);
    //   });
    //   return response;
    // }






    // @Get('upload/:filename')
    // @UseInterceptors(FileInterceptor('file'))
    // getFile(@UploadedFile() file: Express.Multer.File) {
    //   console.log(file);
    // }
}