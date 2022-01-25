import { eventsMock } from '../util/mocks/events.js';

class EventsService {
  async getEvents() {
    const events = await Promise.resolve(eventsMock);
    return events || [];
  }
}

export { EventsService };
