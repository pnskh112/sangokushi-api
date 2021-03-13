import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
    code: string;
    title: string;
    message: string | string[];
}
export class CustomHttpException extends HttpException {
    private _response: ErrorResponse;
    private _statusCode: HttpStatus;

    constructor(response: ErrorResponse, statusCode: HttpStatus) {
        super(
            HttpException.createBody(response, response.title, statusCode),
            statusCode,
        );
        this._response = response;
        this._statusCode = statusCode;
    }
    getStatus = () => this._statusCode;
    getResponse = () => this._response;
}
