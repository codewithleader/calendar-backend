const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      message: 'Not existing token!',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    /* Adding the "uid" and "name" to the request object. */
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid token!',
    });
  }

  next();
};

module.exports = { validateJWT };
