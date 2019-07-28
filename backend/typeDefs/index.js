const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Barn {
    id: ID!
    name: String
  }
  type Section {
    id: ID!
    name: String
    datetime: String,
    collects: [Collect]
    deads: [Collect]
  }
  type CollectedSection {
    sectionName: String
    values: [Collected]
  }
  type Collected {    
    date: String
    quantity: Int
    averageWeightPerEgg: Float
    amount: Float
  }
  type Campaing {
    id: ID!
    year: Int
    month: Int
    startAt: String
    endAt: String
    barn: Barn
    sections: [Section]    
    last5daysCollectedBySection: [CollectedSection]
    allCollected: [Collected]
    quantityBird: Int
    averageWeightPerEgg: Float
    foodWeightPerDay: Float
    foodPrice: Float
    isActive: Boolean
  }
  type Collect {
    id: ID!
    quantity: Int,
    datetime: String
  }
  type Variables {
    lastUpdateOfAverageWeightPerEgg: String
    price: Float
    lastUpdateOfPrice: String
    lastUpdateOfFood: String
  }
  type CommonResponse {
    id: ID!
    isSuccess: Boolean
  }
  input AverageWeigthPerEgg {
    campaingId: ID!
    averageWeightPerEgg: Float
  }
  input Food {
    campaingId: ID!
    foodWeightPerDay: Float
    foodPrice: Float
  }
  type Query {
    barns: [Barn]
    campaings: [Campaing]
    section(id: ID!, datetime: String): Section    
    variables: Variables
  }  
  type Mutation {
    createBarn(name: String): Barn
    createCampaing(year: Int, month: Int, startAt: String, endAt: String, barnId: ID, quantityBird: Int, sectionsNames: [String]): Campaing
    createCollect(sectionId: ID, quantity: Int, datetime: String): Collect
    deleteCollect(id: ID!): CommonResponse
    createDeadChicken(sectionId: ID, quantity: Int, datetime: String): Collect
    deleteDeadChicken(id: ID!): CommonResponse
    updateAverageWeightPerEggs(averagesWeigths: [AverageWeigthPerEgg]): Boolean
    updateFood(foods: [Food]): Boolean
    updatePrice(price: Float): Boolean
  }
`;

module.exports = typeDefs;
