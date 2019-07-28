const {  
  Section,
  Collect
} = require('../models')

const {
  getMaxMinDate
} = require('./utils')

async function getSection(_id, datetime) {
  const section = await Section.findOne({
    _id
  }).exec();
  const parsed = {
    id: section._id,
    name: section.name,
    datetime: datetime
  }
  return parsed
}

async function collects (section){
  let {
    datetime
  } = section
  const {
    maxDatetime,
    minDatetime
  } = getMaxMinDate(datetime)
  return await Collect.find({
    sectionId: section.id,
    type: 'COLLECTED',
    datetime: {
      $gte: minDatetime,
      $lte: maxDatetime
    }
  }).exec();
}

async function deads(section) {
  let {
    datetime
  } = section
  const {
    maxDatetime,
    minDatetime
  } = getMaxMinDate(datetime)
  return await Collect.find({
    sectionId: section.id,
    type: 'DEAD_CHICKEN',
    datetime: {
      $gte: minDatetime,
      $lte: maxDatetime
    }
  }).exec();
}

module.exports = {
  getSection,
  collects,
  deads
}