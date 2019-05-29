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
  /* .populate({
    path: 'sections',
    model: 'Section',
    populate: {
      path: 'collects',
      model: 'Collect'
    }
  }) */ 
  .exec();
  console.log(campings[0].sections)
  return campings
}

async function getSection(_id) {
  const section = await Section.findOne({_id})  
  .populate('collects')    
  .exec();  
  console.log('section>>>>>>>>>>', section)
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

async function createCollect(data) {
  const { sectionId, quantity} = data
  const collect = await Collect.create({quantity})
  await Section.updateOne({ _id: sectionId },
    {
      $push: { collects: collect }
    }
  ).exec();
  return collect
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
      console.log('sejction', data)
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
      return createCollect(data)
    },
  }
};

module.exports = resolvers