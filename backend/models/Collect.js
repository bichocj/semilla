const mongoose = require('mongoose');
const CollectSchema = new mongoose.Schema( {
  quantity: {
    type: Number,    
    required: 'quantity cannot be blank'
  },
  datetime: { 
    type: Date,
    required: 'datetime cannot be blank',
  },
  createdAt: { 
    type: Date,
    default: Date.now,
  }
});

const Collect = mongoose.model('Collect', CollectSchema);
module.exports = Collect;
