const mongoose = require('mongoose');
const BarnSchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    required: 'name cannot be blank'
  },
  createdAt: { 
    type: Date,
    default: Date.now,
  },
  updatedAt: { 
    type: Date,
    default: Date.now,
  }    
});

const Barn = mongoose.model('Barn', BarnSchema);
module.exports = Barn;
