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
  if (type === 'COLLECTED') {
    updateStats(sectionId, quantity, datetime)
  }
  return await Collect.create({
    sectionId,
    quantity,    
    datetime,
    type
  })
}

async function updateStats(sectionId, quantity, datetime){  
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
}

async function deleteCollect(data) {
  const {
    id
  } = data

  const collect = await Collect.findOne({_id: id}).exec()
  if (collect!==null) {
    const sectionId = collect.sectionId
    const campaing = await Campaing.findOne({sections: sectionId}).exec();    
    const datetime = collect.datetime
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
    
    const averageWeightPerEgg = stats.weightEggsCollected / stats.quantityEggsCollected
    const price = stats.amountIn / stats.weightEggsCollected

    const collectWeightEggsCollected = averageWeightPerEgg * collect.quantity
    const collectAmountIn = price * collectWeightEggsCollected

    let quantityEggsCollected = stats.quantityEggsCollected - collect.quantity
    let weightEggsCollected = stats.weightEggsCollected - collectWeightEggsCollected
    let amountIn = stats.amountIn - collectAmountIn
    let amountTotal = stats.amountTotal - collectAmountIn  
    await Stats.findOneAndUpdate(
      {_id:stats.id},
      {
        quantityEggsCollected,
        weightEggsCollected,
        amountIn,
        amountTotal
      }
    ).exec()

    await Collect.deleteOne({
      _id: id
    })
  }
  return {
    id,
    isSuccess: true
  }
}


module.exports = {
  createCollect,
  deleteCollect
}