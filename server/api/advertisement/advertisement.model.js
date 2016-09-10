'use strict';

import mongoose from 'mongoose';

var AdvertisementSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String, // IMAGE ||
  url: String,
  southeast_latitude: Number,
  southeast_longitude: Number,
  northwest_latitude: Number,
  northwest_longitude: Number
});

export default mongoose.model('Advertisement', AdvertisementSchema);
