import { body, validationResult } from 'express-validator';

export const validateTask = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .optional(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];