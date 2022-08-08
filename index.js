var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require("fs");
//var { DataStore } = require('notarealdb');
const { report } = require('process');
const { DB } = require('./db');
const db = new DB('localhost', 'root', 'root');

var schema = buildSchema(fs.readFileSync("schema.graphql").toString());

var root = {
  listMovies: async () => {
    try {
      const result = await db.getMovies()
      return result
    }
    catch (e) {
      throw new Error(e)
    }
  },
  
  Actors: () => {
      return [{ ID: "123", Name: "XYZ", AgentName: "Alex" }];
  }
}



var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');