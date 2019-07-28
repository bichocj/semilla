const {  Variables } = require('../models')

async function getVariables() {
  return await Variables.findOne().exec()
}

async function updatePrice(data) {
  const {
    price
  } = data
  const variable = await Variables.findOne().exec();
  if (variable) {
    await Variables.findOneAndUpdate({_id:variable._id}, {price}).exec()
  } else {
    await Variables.create({price}).exec()
  }
  return true
}

module.exports = {
  getVariables,
  updatePrice
}