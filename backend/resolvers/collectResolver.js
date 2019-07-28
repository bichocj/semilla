const {  
  Campaing,
  Collect,
  Variables
} = require('../models')


async function createCollect(data, type) {
  const {
    quantity,
    sectionId
  } = data
  let {
    datetime
  } = data
  datetime = new Date(parseInt(datetime))
  let amount = 0
  let averageWeightPerEgg=0
  const variable = await Variables.findOne().exec();
  const campaing = await Campaing.findOne({sections: sectionId}).exec();  

  if (campaing) {
    averageWeightPerEgg = campaing.averageWeightPerEgg * quantity
  }
  if (variable) {
    amount = averageWeightPerEgg * variable.price
  }

  return await Collect.create({
    sectionId,
    quantity,
    amount,
    averageWeightPerEgg,
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


module.exports = {
  createCollect,
  deleteCollect
}