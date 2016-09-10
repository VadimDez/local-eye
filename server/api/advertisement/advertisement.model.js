'use strict';

import mongoose from 'mongoose';

var AdvertisementSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Advertisement', AdvertisementSchema);
