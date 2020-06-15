const fs = require ('fs');
const express = require ('express');

const app = express ();

app.use (express.json ());

const tours = JSON.parse (
  fs.readFileSync (`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get ('/api/v1/tours', (req, res) => {
  res.status (200).json ({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get ('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find (tour => tour.id.toString () === req.params.id);
  if (!tour) return res.status (404).json ({status: 'Fail', msg: 'Invalid Id'});
  res.status (200).json ({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post ('/api/v1/tours', (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign ({id: newId}, req.body);
  tours.push (newTour);
  fs.writeFile (
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify (tours),
    err => {
      res.status (201).json ({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch ('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status (404).json ({status: 'Fail', msg: 'Invalid Id'});
  }
  res.status (200).json ({
    status: 'success',
    data: {
      tour: 'Updated Tour',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status (404).json ({status: 'Fail', msg: 'Invalid Id'});
  }
  res.status (204).json ({
    status: 'success',
    data: {
      tour: null
    },
  });
})

app.listen (5000, () => {
  console.log ('Server started on port 7000');
});
