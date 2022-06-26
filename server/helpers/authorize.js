/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const jwt = require('express-jwt');
const { secret } = require('../config.json');

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ['HS256'] }),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !req.user.roles.some(item => roles.includes(item))) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorize;
