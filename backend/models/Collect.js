const mongoose = require('mongoose');
const CollectSchema = new mongoose.Schema( {
  quantity: {
    type: Number,    
    required: 'name cannot be blank'
  },
  createdAt: { 
    type: Date,
    default: Date.now,
  }
});

const Collect = mongoose.model('Collect', CollectSchema);
module.exports = Collect;
