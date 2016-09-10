'use strict';

import mongoose from 'mongoose';

var AdvertisementSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String, // IMAGE ||
  url: String,
  southwest_latitude: Number,
  southwest_longitude: Number,
  northeast_latitude: Number,
  northeast_longitude: Number
});

export default mongoose.model('Advertisement', AdvertisementSchema);
