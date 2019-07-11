const mongoose = require('mongoose');
const CollectSchema = new mongoose.Schema( {
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  },
  type: {
    type: String,  
    uppercase: true,
    required: 'status can be either ACTIVE or INACTIVE',
    enum: ['COLLECTED', 'DEAD_CHICKEN'],
    default: 'COLLECTED'
  },
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
