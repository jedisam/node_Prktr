const mongoose = require ('mongoose');

const tourSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'A tour name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// eslint-disable-next-line no-multi-assign
const Tour = mongoose.model ('Tour', tourSchema);
module.exports = Tour;
