const mongoose = require('mongoose');

const VariablesSchema = new mongoose.Schema( {
  lastUpdateOfAverageWeight  : {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,    
    required: 'quantity cannot be blank'
  },
  lastUpdateOfPrice  : {
    type: Date,
    default: Date.now,
  }
});

const Variables = mongoose.model('Variables', VariablesSchema);
module.exports = Variables;
