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
  const section = await Section.findOne({_id})  
  .populate('collects')    
  .populate('deads')    
  .exec();  
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

async function createCollect_COLLECTED(data) {
  const collect = await createCollect(data, 'COLLECTED')
  const { sectionId } = data  
  await Section.updateOne({ _id: sectionId },
    {
      $push: { collects: collect }
    }
  ).exec();
  return collect
}

async function deleteCollect_COLLECTED(data) {
  const result = await deleteCollect(data)
  const { sectionId } = data  
  await Section.updateOne({ _id: sectionId },
    {
      $pop: { collects: collect }
    }
  ).exec();
  return result
}

async function createCollect_DEAD_CHICKEN(data) {
  const collect = await createCollect(data, 'DEAD_CHICKEN')
  const { sectionId } = data  
  await Section.updateOne({ _id: sectionId },
    {
      $push: { deads: collect }
    }
  ).exec();
  return collect
}

async function deleteCollect_DEAD_CHICKEN(data) {
  const result = await deleteCollect(data)
  const { sectionId } = data  
  await Section.updateOne({ _id: sectionId },
    {
      $pop: { deads: collect }
    }
  ).exec();
  return result
}

async function createCollect(data, type) {
  const { quantity } = data  
  let { datetime } = data
  datetime = new Date(parseInt(datetime))  
  return await Collect.create({quantity, datetime})    
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
      return createCollect_COLLECTED(data)
    },
    deleteCollect: async (parent, data, context) => {      
      return deleteCollect_COLLECTED(data)
    },
    createDeadChicken: async (parent, data, context) => {     
      return createCollect_DEAD_CHICKEN(data)
    },
    deleteDeadChicken: async (parent, data, context) => {      
      return deleteCollect_DEAD_CHICKEN(data)
    }
  }
};

module.exports = resolvers