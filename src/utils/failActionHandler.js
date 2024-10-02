const failAction = (request, h, error) => {
  return h
    .response({
      status: 'fail',
      message: error.details[0].message,
    })
    .code(400)
    .takeover();
};

module.exports = failAction;
