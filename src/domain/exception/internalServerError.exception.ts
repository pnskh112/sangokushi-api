import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './core/customHttp.exception';

export class InternalServerErrorException extends CustomHttpException {
    static readonly description = 'InternalServerErrorException';
    static readonly code = '500-001';
    static readonly message =
        'The api can not return http response because an internal server error occurred.';
    constructor(message = InternalServerErrorException.message) {
        super(
            {
                code: InternalServerErrorException.code,
                title: InternalServerErrorException.description,
                message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
