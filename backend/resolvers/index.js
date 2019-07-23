const {
  Barn,
  Campaing,
  Collect,
  Section
} = require('../models')

async function getBarns() {
  return await Barn.find().exec();
}

async function createBarn(data) {
  const {
    name
  } = data
  return await Barn.create({
    name
  });
}

async function getCampaings() {
  const campings = await Campaing.find()
    .populate('barn')
    .populate('sections')
    .exec();
  return campings
}

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

async function createCollect(data, type) {
  const {
    quantity,
    sectionId
  } = data
  let {
    datetime
  } = data
  datetime = new Date(parseInt(datetime))
  return await Collect.create({
    sectionId,
    quantity,
    datetime,
    type
  })
}

async function deleteCollect(data) {
  const {
    id
  } = data
  await Collect.remove({
    _id: id
  })
  return {
    id,
    isSuccess: true
  }
}

async function updateAverageWeights(data) {
  const {
    averagesWeigths
  } = data
  averagesWeigths.forEach(item => {
    const {id, averageWeight } = item    
    Campaing.findOneAndUpdate({_id:id}, {averageWeight}).exec()
  })
  return true
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

const resolvers = {
  Campaing: {
    last5daysCollectedBySection: async (campaing) => {
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
    },
    allCollected: async (campaing) => {
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
            totalAmount: {
              $sum: "$quantity"
            },
            count: {
              $sum: 1
            }
          }
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
          quantity: doc.totalAmount
        })
      })
      return result
    },
  },
  Section: {
    collects: async (section) => {
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
    },
    deads: async (section) => {
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
  },
  Query: {
    barns: async () => {
      return getBarns()
    },
    campaings: async (parent, data, context) => {
      return getCampaings()
    },
    section: async (parent, data, context) => {
      const {
        id,
        datetime
      } = data
      return getSection(id, datetime)
    }
  },
  Mutation: {
    createBarn: async (parent, data, context) => {
      return createBarn(data)
    },
    createCampaing: async (parent, data, context) => {
      return createCampaing(data)
    },
    createCollect: async (parent, data, context) => {
      return createCollect(data, "COLLECTED")
    },
    deleteCollect: async (parent, data, context) => {
      return deleteCollect(data)
    },
    createDeadChicken: async (parent, data, context) => {
      return createCollect(data, "DEAD_CHICKEN")
    },
    deleteDeadChicken: async (parent, data, context) => {
      return deleteCollect(data)
    },
    updateAverageWeights: async (parent, data, context) => {
      return updateAverageWeights(data)
    }
  }
};

module.exports = resolvers