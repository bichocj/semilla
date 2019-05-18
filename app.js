const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const server = require('./backend/server');
const app = express();
var path = require('path');


server.applyMiddleware({ app });

app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.get('/_nuxt/:file', function (req, res) {  
  const file = req.params.file;
  res.sendFile(path.join(__dirname + '/backend/client/_nuxt/' + file));
});
app.get('/*', function (req, res) {  
  res.sendFile(path.join(__dirname + '/backend/client/index.html'));
});
app.listen(process.env.PORT || 3000, function () {
  console.log(`🚀  Server ready!`);
});

module.exports = app;