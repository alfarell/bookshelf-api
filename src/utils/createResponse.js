class CreateResponse {
  constructor(message, data = {}) {
    this.message = message;
    this.data = data;
  }

  success() {
    return {
      payload: {
        status: 'success',
        ...(this.message && { message: this.message }),
        data: this.data,
      },
      code: 200,
    };
  }

  failed() {
    return {
      payload: {
        status: 'fail',
        message: this.message,
      },
      code: 400,
    };
  }
}

module.exports = CreateResponse;
