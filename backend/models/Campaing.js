const mongoose = require('mongoose');

const CampaingSchema = new mongoose.Schema({  
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  startAt: {
    type: Date,    
  },
  endAt: {
    type: Date,    
  },
  barn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barn'
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  }],  
  quantityBird: {
    type: Number
  },
  status: {
    type: Boolean,
    default: true    
  },
  averageWeight: {
    type: Number,
    default: 0 
  }
});

const Campaing = mongoose.model('Campaing', CampaingSchema);
module.exports = Campaing;
