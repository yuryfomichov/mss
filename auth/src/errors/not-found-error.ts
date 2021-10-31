import { CustomError } from './custom-error';

const MESSAGE = 'The resource is not found';

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = MESSAGE;

  constructor() {
    super(MESSAGE);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    console.log(this);
    return [
      {
        message: this.reason,
      },
    ];
  }
}
