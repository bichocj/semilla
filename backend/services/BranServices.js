// const { isEmpty } = require('lodash');
// const { GuideClient, Guide } = require('../models');

// should create a guideClient and update the guide
// async function createGuideClient(kwId, guide) {
class BrandServices {
  
  async create(data) {
    data = {
      _id: '123',
      name: 'zas'
    }
    return {
      isSuccess: true,
      data
    }
  }
}