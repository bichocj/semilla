const { Bran } = require('../models')

async function getBrands() {
  const brands = await Bran.find().exec();
  return brands;
}

async function createBrand(data) {
  const { name } = data  
  const brand = await Bran.create({ name });
  return brand;
}


const resolvers = {
  Query: {
    getBrands: async() => { 
      return getBrands()
    }
  },
  Mutation: {
    createBrand: async (parent, data, context) => {     
      return createBrand(data)
    }
  }
};

module.exports = resolvers