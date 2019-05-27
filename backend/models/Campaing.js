const mongoose = require('mongoose');

const CampaingSchema = new mongoose.Schema({  
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  start_at: {
    type: Date,    
  },
  end_at: {
    type: Date,    
  },
  steps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  }],
  barn: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quantity_bird: {
    type: Number
  },
  status: {
    type: String,
    default: 'ACTIVE',
    uppercase: true,
    enum:['ACTIVE','INACTIVE'],
    required: 'status can be either ACTIVE or INACTIVE'
  },
});

const Campaing = mongoose.model('Campaing', CampaingSchema);
module.exports = Campaing;
