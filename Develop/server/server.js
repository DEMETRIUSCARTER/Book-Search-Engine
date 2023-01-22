const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { ApolloServer, gql } = require('apollo-server-express');

const { authMiddleware } = require('./utils/auth');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build'));
 });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
  
});
});
