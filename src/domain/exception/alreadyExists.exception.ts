import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './core/customHttp.exception';

export class AlreadyExistsException extends CustomHttpException {
    static readonly description = 'AlreadyExistsException';
    static readonly code = '409-001';
    static readonly message =
        'The api could not store, since the same data relevant to given parameter already existed in database.';
    constructor(message = AlreadyExistsException.message) {
        super(
            {
                code: AlreadyExistsException.code,
                title: AlreadyExistsException.description,
                message,
            },
            HttpStatus.CONFLICT,
        );
    }
}
