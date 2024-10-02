class CreateResponse {
  constructor(serviceData) {
    this.message = serviceData.message;
    this.data = serviceData.data;
    this.code = serviceData?.success || serviceData?.failed;
    this.status = serviceData?.success ? 'success' : 'fail';
  }

  getResponse() {
    return {
      payload: {
        status: this.status,
        ...(this.message && { message: this.message }),
        ...(this.data && { data: this.data }),
      },
      code: this.code,
    };
  }
}

module.exports = CreateResponse;
