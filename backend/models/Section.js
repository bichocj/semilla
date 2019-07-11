const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    required: 'name cannot be blank'
  },
  collects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collect'
  }],  
  deads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collect'
  }] 
});

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
