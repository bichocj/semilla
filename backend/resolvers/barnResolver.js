const {  
  Barn
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

module.exports = {
  getBarns,
  createBarn
}