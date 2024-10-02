class CreateResponse {
  constructor(message, data = {}) {
    this.message = message;
    this.data = data;
  }

  success() {
    return {
      payload: {
        status: 'success',
        message: this.message,
        data: this.data,
      },
      code: 200,
    };
  }

  failed(message) {
    return {
      payload: {
        status: 'fail',
        message,
      },
      code: 400,
    };
  }
}

module.exports = CreateResponse;
