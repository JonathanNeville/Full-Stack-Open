const { request, response } = require("../app");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log(authorization);
  console.log(request.headers);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7); /*7 is length of 'bearer ' */
  } else {
    request.token = null;
  }

  next();
};

module.exports = tokenExtractor;
