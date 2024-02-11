class ApiResponse {
  constructor(statusCode, data, error, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
    this.message = "Success";
    this.success = statusCode >= 200 && statusCode < 300;
  }
}

export {ApiResponse}