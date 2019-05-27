const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Brand {
    id: ID!
    name: String
  }
  type Query {
    getBrands: [Brand]
  }  
  type Mutation {
    createBrand(name: String): Brand
  }
`;

module.exports = typeDefs;
