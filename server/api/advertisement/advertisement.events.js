/**
 * Advertisement model events
 */

'use strict';

import {EventEmitter} from 'events';
import Advertisement from './advertisement.model';
var AdvertisementEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdvertisementEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Advertisement.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AdvertisementEvents.emit(event + ':' + doc._id, doc);
    AdvertisementEvents.emit(event, doc);
  }
}

export default AdvertisementEvents;
