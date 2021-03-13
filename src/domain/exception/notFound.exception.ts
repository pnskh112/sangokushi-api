import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './core/customHttp.exception';

export class NotFoundException extends CustomHttpException {
    static readonly description = 'NotFoundException';
    static readonly code = '404-001';
    static readonly message = 'Resource not found.';
    constructor(message: string | string[] = NotFoundException.message) {
        super(
            {
                code: NotFoundException.code,
                title: NotFoundException.description,
                message,
            },
            HttpStatus.NOT_FOUND,
        );
    }
}
