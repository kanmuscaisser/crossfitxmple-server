import express from 'express';
import { EventsService } from '../services/events.service.js';
import { validationHandler } from '../util/middleware/validationHandler.js';
import { 
  eventIdSchema,
  createEventSchema,
  updateEventSchema 
} from '../util/schemas/event.schema.js'
const router = express.Router();

const eventService = new EventsService();

router.get('/', async (req, res, next) => {
  try {
    const events = await eventService.getEvents();
    res.json({
      data: events,
      message: 'Events listed'
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id', 
  validationHandler({ id: eventIdSchema }, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    res.json({
      data: event,
      message: 'Event retrieved' });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createEventSchema),
  async (req, res, next) => {
    try {
      const { body: newEvent } = req;

      const createdEventId = await eventService.createEvent(newEvent);
      res.status(201).json({
        data: createdEventId,
        message: 'Event created',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validationHandler({ id: eventIdSchema }, 'params'),
  validationHandler(updateEventSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: event } = req;
      const updatedEventId = await eventService.updateEvent({
        id,
        event
      });

      res.status(200).json({
        data: updatedEventId,
        message: 'Event updated',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler({ id: eventIdSchema }, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedId = await eventService.deleteEvent(id);
      res.json({
        data: deletedId,
        message: 'Event deleted',
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
