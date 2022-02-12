import joi from '@hapi/joi';

const eventIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const eventNameSchema = joi.string().max(40);
const eventDisciplineSchema = joi.string().max(20);
const eventCountrySchema = joi.string().max(20);
const eventAddressSchema = joi.string().max(20);
const eventDateSchema = joi.date();
const eventDirectorSchema = joi.string().max(20);
const eventCoverSchema = joi.string().uri();

const createEventSchema = {
  name: eventNameSchema.required(),
  discipline: eventDisciplineSchema,
  country: eventCountrySchema.required(),
  address: eventAddressSchema.required(),
  date: eventDateSchema.required(),
  director: eventDirectorSchema.required(),
  cover: eventCoverSchema
};

const updateEventSchema = {
  name: eventNameSchema,
  discipline: eventDisciplineSchema,
  country: eventCountrySchema,
  address: eventAddressSchema,
  date: eventDateSchema,
  director: eventDirectorSchema,
  cover: eventCoverSchema
};

export { eventIdSchema, createEventSchema, updateEventSchema };