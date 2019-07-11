const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    required: 'name cannot be blank'
  } 
});

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
