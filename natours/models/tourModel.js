const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour name is required'],
      trim: true,
      unique: true,
      minlength: [11, 'A tour must have at least 10 characters.'],
      // validate: [validator.isAlpha, 'A Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: String,
      required: [true, 'A tour mush have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour mush have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1.0, 'Rating must be at least 1.0'],
      max: [5.0, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'A Price must be greater than discount',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware: runs before .save() & .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc, next) {

//   next();
// });

// Query middleware
tourSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milleseconds`);
  next();
});

// Aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline.unshift({ $match: { secretTour: { $ne: true } } });
});

// eslint-disable-next-line no-multi-assign
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
