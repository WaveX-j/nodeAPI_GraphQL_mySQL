
var express = require('express');              
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require("fs");
//var { DataStore } = require('notarealdb');
const { report } = require('process');





var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');