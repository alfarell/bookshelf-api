class CreateResponse {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }

  success() {
    return {
      payload: {
        status: 'success',
        ...(this.message && { message: this.message }),
        ...(this.data && { data: this.data }),
      },
      code: 200,
    };
  }

  failed() {
    return {
      payload: {
        status: 'fail',
        ...(this.message && { message: this.message }),
      },
      code: 400,
    };
  }
}

module.exports = CreateResponse;
