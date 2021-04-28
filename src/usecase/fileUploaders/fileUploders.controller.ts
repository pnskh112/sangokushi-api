import { Get, Post, UploadedFiles } from "@nestjs/common";
import { UseInterceptors,UploadedFile,Controller } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { EditFileName } from "src/utils/editFileName.utils";
import { ImageFileFilter } from "src/utils/file-uploading.utils";

@Controller()
export class  FileUploders{
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: EditFileName,
        }),
        fileFilter: ImageFileFilter,
      }),
    ) 
    async uploadedFile(@UploadedFile() file) {
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
          filename: EditFileName,
        }),
        fileFilter: ImageFileFilter,
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

}