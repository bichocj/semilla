const {  
  Section,
  Collect
} = require('../models')

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

function getMaxMinDate(datetime) {
  if (datetime !== undefined) {
    datetime = new Date(parseInt(datetime))
  }
  if (isNaN(datetime)) {
    datetime = new Date()
  }
  datetime.setHours(0)
  datetime.setMinutes(0)
  const minDatetime = new Date(datetime.getTime())
  datetime.setHours(23)
  datetime.setMinutes(59)
  const maxDatetime = new Date(datetime.getTime())
  return {
    maxDatetime,
    minDatetime
  }
}

module.exports = {
  getSection,
  collects,
  deads
}