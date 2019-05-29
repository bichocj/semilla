const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const server = new ApolloServer({ playground: true, typeDefs, resolvers });

module.exports = server;
