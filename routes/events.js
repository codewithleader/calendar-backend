/**
 * Events Routes
 * Path: host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createEvent, getEvents, updateEvent, deleteEvents } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/* A middleware that will be executed before any other route. */
router.use(validateJWT);

router.post('/', [
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom( isDate ),
  check('end', 'End date is required').custom( isDate ),
  validateFields,
], createEvent);

router.get('/', getEvents);

router.put('/:id', [
  check('id', 'It is not a MongoID valid').isMongoId(),
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom( isDate ),
  check('end', 'End date is required').custom( isDate ),
  validateFields,
], updateEvent);

router.delete('/:id', [
  check('id', 'It is not a MongoID valid').isMongoId(),
  validateFields,
], deleteEvents);

module.exports = router;