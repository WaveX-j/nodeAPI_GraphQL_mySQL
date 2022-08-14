var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var fs = require("fs");
const {DB} = require('./db');
const db = new DB('localhost', 'root', 'root');
const {makeExecutableSchema} = require('@graphql-tools/schema');

const typeDefs = fs.readFileSync("schema.graphql").toString()

var resolvers = {
    Query: {
        listMovies: async () => {
            try {
                const result = await db.getMovies()
                return result
            } catch (e) {
                throw new Error(e)
            }
        },
    },

    Movie: {
        Actors(movie) {
            //TODO: Write code here to return actors present in movie
            console.log('movie', movie)
            return [{ID: "123", Name: "XYZ", AgentName: "Alex"}];
        }
    }
}

// We are using this library to make a schema in which we can inject our nested resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    //rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');