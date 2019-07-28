const {  
  Barn,
  Collect,
  Campaing,
  Variables,
  Section,
  Stats
} = require('../models')

const {
  getMaxMinDate
} = require('./utils')

async function createCampaing(data) {
  const {
    year,
    month,
    startAt,
    quantityBird,
    barnId,
    sectionsNames
  } = data
  const barn = await Barn.findOne({
    _id: barnId
  }).exec()
  const sectionsMapNames = sectionsNames.map(sectionsName => {
    return {
      name: sectionsName
    }
  })
  const sections = await Section.insertMany(sectionsMapNames)
  return await Campaing.create({
    year,
    month,
    startAt,
    quantityBird,
    sections,
    barn
  });
}

async function getCampaings() {
  const campings = await Campaing.find()
    .populate('barn')
    .populate('sections')
    .exec();
  return campings
}

async function updateAverageWeightPerEggs(data) {
  const {
    averagesWeigths
  } = data
  averagesWeigths.forEach(item => {
    const {campaingId, averageWeightPerEgg } = item    
    Campaing.findOneAndUpdate({_id:campaingId}, {averageWeightPerEgg}).exec()
  })
  const variable = await Variables.findOne().exec();
  if (variable) {
    await Variables.findOneAndUpdate({_id:variable._id}, {lastUpdateOfAverageWeightPerEgg: new Date()}).exec()
  } else {
    await Variables.create({lastUpdateOfAverageWeightPerEgg: new Date()}).exec()
  }
  return true
}

async function updateFood(data) {
  const {
    foods
  } = data
  foods.forEach(item => {
    const {campaingId, foodWeightPerDay, foodPrice } = item    
    Campaing.findOneAndUpdate({_id:campaingId}, {foodWeightPerDay, foodPrice}).exec()
  })
  const variable = await Variables.findOne().exec();
  if (variable) {
    await Variables.findOneAndUpdate({_id:variable._id}, {lastUpdateOfFood: new Date()}).exec()
  } else {
    await Variables.create({lastUpdateOfFood: new Date()}).exec()
  }
  return true
}

async function last5daysCollectedBySection(campaing) {
  const docs = await Collect.aggregate([{
      $match: {
        sectionId: {
          "$in": campaing.sections
        }
      }
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$datetime"
          },
          month: {
            $month: "$datetime"
          },
          day: {
            $dayOfMonth: "$datetime"
          },
          sectionId: "$sectionId"
        },
        totalAmount: {
          $sum: "$quantity"
        },
        count: {
          $sum: 1
        }
      },
    },
    {
      $project: {
        _id: "$_id",
        totalAmount: "$totalAmount",
        count: "$count",
      }
    },
    {
      $sort: {
        "_id": 1
      }
    }
  ])
  const result = []
  campaing.sections.forEach(section => {
    const tmp = []
    docs.forEach(doc => {
      if (String(doc._id.sectionId) === String(section._id)) {
        tmp.push({
          date: `${doc._id.day}-${doc._id.month}-${doc._id.year}`,
          quantity: doc.totalAmount
        })
      }
    })

    result.push({
      sectionName: section.name,
      values: tmp
    })
  })

  return result
}

async function allCollected(campaing) {
  const docs = await Collect.aggregate([{
      $match: {
        sectionId: {
          "$in": campaing.sections
        }
      }
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$datetime"
          },
          month: {
            $month: "$datetime"
          },
          day: {
            $dayOfMonth: "$datetime"
          },
        },
        totalQuantity: {
          $sum: "$quantity"
        },
        totalAverageWeightPerEgg: {
          $sum: "$averageWeightPerEgg"
        },
        totalAmount: {
          $sum: "$amount"
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        _id: "$_id",
        totalQuantity: "$totalQuantity",
        totalAverageWeightPerEgg: "$totalAverageWeightPerEgg",
        totalAmount: "$totalAmount",
        count: "$count",
      }
    },
    {
      $sort: {
        "_id": 1
      }
    }
  ])
  const result = []
  let currentDate = new Date()
  if(docs.length > 0 ) {
    const firstDateInDate = docs[0]._id
    currentDate.setDate(firstDateInDate.day)
    currentDate.setMonth(firstDateInDate.month-1)
    currentDate.setFullYear(firstDateInDate.year)
    currentDate.setHours(0)
    currentDate.setMinutes(0)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
  }            
  
  docs.forEach(doc => {
    const date = new Date()
    const docDate = doc._id
    date.setDate(docDate.day)
    date.setMonth(docDate.month-1)
    date.setFullYear(docDate.year)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    while(currentDate < date) {
      result.push({
        date: `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`,
        quantity: 0
      })
      currentDate.setDate(currentDate.getDate()+1)
    }
    currentDate.setDate(currentDate.getDate()+1)            
    result.push({
      date: `${doc._id.year}-${doc._id.month}-${doc._id.day}`,
      quantity: doc.totalQuantity,
      amount: doc.totalAmount,
      averageWeightPerEgg: doc.totalAverageWeightPerEgg
    })
  })
  return result
}

async function resumeOfToday(campaing) {
  const datetime = new Date()
  const {
    maxDatetime,
    minDatetime
  } = getMaxMinDate(datetime)

  const result = await Stats.findOne({
    campaingId: campaing.id,
    datetime: {
      $gte: minDatetime,
      $lte: maxDatetime
    }
  }).exec();
  return result || {}
}

module.exports = {
  createCampaing,
  getCampaings,
  updateAverageWeightPerEggs,
  updateFood,
  last5daysCollectedBySection,
  allCollected,
  resumeOfToday
}
