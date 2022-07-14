/**
 * Routes for the authentication / User management
 * Path: host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validate-fields');
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validateFields,
], createUser);

router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields,
], userLogin);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
