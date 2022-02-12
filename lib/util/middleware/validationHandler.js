import boom from '@hapi/boom';
import joi from '@hapi/joi';

function validate(data, schema) {
  const { error } = joi.object(schema).validate(data, { abortEarly: false });
  return error;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
}

export { validationHandler };
