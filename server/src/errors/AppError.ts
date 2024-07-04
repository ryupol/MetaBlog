class AppError extends Error {
  public code: string;
  public status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}

export default AppError;
