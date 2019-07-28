const { 
  createCampaing, 
  getCampaings, 
  updateAverageWeightPerEggs, 
  updateFood,
  last5daysCollectedBySection, 
  allCollected,
  resumeOfToday
} = require('./campaingResolver')
const { getVariables, updatePrice } = require('./variablesResolver')
const { createBarn, getBarns } = require('./barnResolver')
const { createCollect, deleteCollect } = require('./collectResolver')
const { getSection, collects, deads } = require('./sectionResolver')

/*const {  
  Barn,
  Campaing,
  Collect,
  Section,
  Variables
} = require('../models')
*/

const resolvers = {
  Campaing: {
    last5daysCollectedBySection,
    allCollected,
    resumeOfToday
  },
  Section: {
    collects,
    deads
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
    },    
    variables: async (parent, data, context) => {
      return getVariables()
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
    updateAverageWeightPerEggs: async (parent, data, context) => {
      return updateAverageWeightPerEggs(data)
    },
    updatePrice: async (parent, data, context) => {
      return updatePrice(data)
    },
    updateFood: async (parent, data, context) => {
      return updateFood(data)
    },
  }
};

module.exports = resolvers