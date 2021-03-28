import { Post } from "@nestjs/common";
import { UseInterceptors,UploadedFile,Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { Express } from 'express'

@Controller()
export class  FileUploders{
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
    
}