import { Mongo } from '../database/mongo.js';

class EventsService {
  constructor() {
    this.collection = 'events';
    this.mongoDB = new Mongo();
  }

  async getEvents() {
    const events = await this.mongoDB.getAll(this.collection);
    return events || [];
  }

  async getEventById(id) {
    const event = await this.mongoDB.get(this.collection, id);
    return event || {};
  }

  async createEvent(event) {
    const newEventId = await this.mongoDB.create(this.collection, event);
    return newEventId || {};
  }

  async updateEvent({ id, event } = {}) {
    console.log(event);
    const updatedEventId = await this.mongoDB.update(
      this.collection,
      id,
      event
    );
    return updatedEventId;
  }

  async deleteEvent(id) {
    const deletedEventId = await this.mongoDB.delete(this.collection, id);
    return { deletedEventId };
  }

}

export { EventsService };
