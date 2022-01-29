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

export { router };