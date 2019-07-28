const {  
  Campaing,
  Collect,
  Variables,
  Stats
} = require('../models')
const {
  getMaxMinDate
} = require('./utils')

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

  let quantityEggsCollected = quantity
  let weightEggsCollected = campaing.averageWeightPerEgg * quantity
  let amountIn = weightEggsCollected * variable.price
  let amountTotal = 0

  const {
    maxDatetime,
    minDatetime
  } = getMaxMinDate(datetime)

  const stats = await Stats.findOne({
    campaingId: campaing.id,
    datetime: {
      $gte: minDatetime,
      $lte: maxDatetime
    }
  }).exec();

  if (stats !== null) {    
    quantityEggsCollected = quantityEggsCollected + stats.quantityEggsCollected
    weightEggsCollected = weightEggsCollected + stats.weightEggsCollected
    amountIn = stats.amountIn + amountIn
    amountTotal = amountIn - stats.amountOut

    await Stats.findOneAndUpdate(
      {_id:stats.id},
      {
        quantityEggsCollected,
        weightEggsCollected,
        amountIn,
        amountTotal
      }
    ).exec()

  } else {
    const foodConsumed = campaing.foodWeightPerDay
    const amountOut = campaing.foodPrice * foodConsumed
    amountTotal = amountIn - amountOut

    await Stats.create({
      campaingId: campaing.id,
      quantityEggsCollected,
      weightEggsCollected,
      amountIn,
      foodConsumed,
      amountOut,
      amountTotal,
      datetime
    })
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