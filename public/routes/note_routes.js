// note_routes.js

var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {
  app.get('/eggData/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('eggs').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/eggData/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('eggs').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Egg ' + id + ' deleted.');
      }
    });
  });

  app.put('/eggData/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const egg = { eggSerial: req.body.eggSerial, eggMAC: req.body.eggMAC, eggType: req.body.eggType };
    db.collection('eggs').update(details, egg, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Egg ' + id + ' update attempted.');
      }
    });
  });


  app.post('/eggData', (req, res) => {
    const egg = { eggSerial: req.body.eggSerial, eggMAC: req.body.eggMAC, eggType: req.body.eggType };
    db.collection('eggs').insert(egg, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
