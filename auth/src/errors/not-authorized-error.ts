import { CustomError } from './custom-error';

const MESSAGE = 'Not Authorized';

export class NotAuthrizedError extends CustomError {
  statusCode = 401;
  message = MESSAGE;

  constructor() {
    super(MESSAGE);

    Object.setPrototypeOf(this, NotAuthrizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
