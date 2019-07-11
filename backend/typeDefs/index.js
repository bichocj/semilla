const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Barn {
    id: ID!
    name: String
  }
  type Section {
    id: ID!
    name: String
    collects: [Collect]
  }
  type Campaing {
    id: ID!
    year: Int
    month: Int
    startAt: String
    endAt: String
    barn: Barn
    sections: [Section]
    quantityBird: Int
    status: Boolean
  }
  type Collect {
    id: ID!
    quantity: Int,
    datetime: String
  }
  type CommonResponse {
    id: ID!
    isSuccess: Boolean
  }
  type Query {
    barns: [Barn]
    campaings: [Campaing]
    section(id: ID!): Section
  }  
  type Mutation {
    createBarn(name: String): Barn
    createCampaing(year: Int, month: Int, startAt: String, endAt: String, barnId: ID, quantityBird: Int, sectionsNames: [String]): Campaing
    createCollect(sectionId: ID, quantity: Int, datetime: String): Collect
    deleteCollect(id: ID!): CommonResponse
  }
`;

module.exports = typeDefs;
