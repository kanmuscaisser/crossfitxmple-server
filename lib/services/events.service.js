import { eventsMock } from '../util/mocks/events.js';

class EventsService {
  async getEvents() {
    const events = await Promise.resolve(eventsMock);
    return events || [];
  }

  async getEventById(id) {
    const event = await Promise.resolve(
      eventsMock.find((event) => event.id === id)
    );
    return event || {};
  }

  async createEvent(event) {
    await Promise.resolve(
      eventsMock.push(event)
    );
    return event || {};
  }

  async deleteEvent(id) {
    const index = eventsMock.findIndex(event => event.id === id);
    eventsMock.splice(index,1);

    return { id };
  }

}

export { EventsService };
