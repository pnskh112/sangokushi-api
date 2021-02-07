import { Controller, Get } from '@nestjs/common';

@Controller('bushos')
export class BushosController {
    @Get()
    findAll(): String {
        return 'This action returns all bushos';
    }
}
