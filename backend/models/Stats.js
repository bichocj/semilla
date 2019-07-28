const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema( {
  campaingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaing'
  },
  quantityEggsCollected: {
    type: Number,    
    required: 'quantity cannot be blank',
    default: 0
  },
  weightEggsCollected: {
    type: Number,    
    required: 'weight cannot be blank',
    default: 0
  },
  amountIn: {
    type: Number,    
    required: 'amount in cannot be blank',
    default: 0
  },
  foodConsumed: {
    type: Number,    
    required: 'food consumed cannot be blank',
    default: 0
  },
  amountOut: {
    type: Number,    
    required: 'amount out cannot be blank',
    default: 0
  },
  amountTotal: {
    type: Number,    
    required: 'amount total cannot be blank',
    default: 0
  },
  datetime: { 
    type: Date,
    required: 'datetime cannot be blank',
  },
});

const Stats = mongoose.model('Stats', StatsSchema);
module.exports = Stats;
