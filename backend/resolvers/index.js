const { Barn, Campaing, Collect, Section } = require('../models')

async function getBarns() {
  return await Barn.find().exec();  
}

async function createBarn(data) {
  const { name } = data  
  return await Barn.create({ name });  
}

async function getCampaings() {
  const campings = await Campaing.find()
  .populate('barn')
  .populate('sections')    
  .exec();
  return campings
}

async function getSection(_id) {
  const section = await Section.findOne({_id}).exec();  
  return section
}

async function createCampaing(data) {
  const { year, month, startAt, quantityBird, barnId, sectionsNames } = data
  const barn = await Barn.findOne({_id: barnId}).exec()
  const sectionsMapNames = sectionsNames.map(sectionsName => { return {name: sectionsName}})
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
  const { quantity, sectionId } = data  
  let { datetime } = data
  datetime = new Date(parseInt(datetime))  
  return await Collect.create({sectionId, quantity, datetime})    
}

async function deleteCollect(data) {
  const { id } = data
  await Collect.remove({_id: id})
  return {
    id,
    isSuccess: true
  }
}


const resolvers = {
  Campaing: {
    last5daysCollected: async(campaing) => {         
      const docs = await Collect.aggregate([
        { 
          $match: {
            sectionId: {
              "$in": campaing.sections
            }
          }
        },            
        {
          $group:{
              _id: { day: { $dayOfMonth: "$datetime"}, month: { $month: "$datetime" }, year: { $year: "$datetime" }, sectionId: "$sectionId" },
              totalAmount: { $sum: "$quantity" },
              count: { $sum: 1 }
            }
        },
      ])
      const result = []
      campaing.sections.forEach(section => {
        const tmp = []
        docs.forEach(doc => {
          if(String(doc._id.sectionId) === String(section._id)){
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

      console.log(result)
      
      return result
    },
    allCollected: async() => { 
      return [{
        date: 'hoy',
        quantity: 0
      },
      {
        date: 'hoy',
        quantity: 0
      }]
    },
  },
  Section: {
    collects: async(section) => {      
      return await Collect.find({sectionId: section.id, type: 'COLLECTED'}).exec();  
    },
    deads: async(section) => {
      return await Collect.find({sectionId: section.id, type: 'DEAD_CHICKEN'}).exec();  
    }
  },
  Query: {    
    barns: async() => { 
      return getBarns()
    },
    campaings: async() => {
      return getCampaings()
    },
    section: async(parent, data, context) => {      
      const { id } = data
      return getSection(id)
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
    }
  }
};

module.exports = resolvers