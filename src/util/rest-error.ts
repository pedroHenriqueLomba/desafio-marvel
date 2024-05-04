export class RestError {
  public code: RestErrorCodes;
  public message: string;

  constructor(message: string, code: RestErrorCodes = RestErrorCodes.BAD_REQUEST) {
    this.code = code;
    this.message = message;
  }
}

export enum RestErrorCodes {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}
