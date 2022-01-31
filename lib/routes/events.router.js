import express from 'express';
import { EventsService } from '../services/events.service.js';
const router = express.Router();

const eventService = new EventsService();

router.get('/', async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.json({
      data: events,
      message: 'Events listed'
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    res.json({
      data: event,
      message: 'Event retrieved' });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body: newEvent } = req;

    const createdEvent = await eventService.createEvent(newEvent);
    res.status(201).json({
      data: createdEvent,
      message: 'Event created' });
  } catch (error) {
    console.log(error);
  }
});

export { router };
