function getMaxMinDate(datetime) {
  if (datetime !== undefined) {
    datetime = new Date(parseInt(datetime))
  }
  if (isNaN(datetime)) {
    datetime = new Date()
  }
  datetime.setHours(0)
  datetime.setMinutes(0)
  const minDatetime = new Date(datetime.getTime())
  datetime.setHours(23)
  datetime.setMinutes(59)
  const maxDatetime = new Date(datetime.getTime())
  return {
    maxDatetime,
    minDatetime
  }
}

module.exports = {
  getMaxMinDate
}