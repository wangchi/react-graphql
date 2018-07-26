const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const { ApolloServer, gql } = require('apollo-server-koa');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// Fake data
const books = [
  {
    id: 1,
    title: 'HTML5 Tutorial',
    author: 'xiaowang',
    date: new Date(2018, 7, 20)
  },
  {
    id: 2,
    title: 'Deep Learning With React',
    author: 'xiaoli',
    date: new Date(2018, 7, 21)
  },
  {
    id: 3,
    title: 'Vue Cookbook',
    author: 'xiaoming',
    date: new Date(2018, 7, 22)
  }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date
  type Book{
    id: Int!
    title: String
    author: String
    date: Date
  }
  type Query {
    books: [Book]
    book(id: Int!):Book
  }
  type Mutation {
    addBook(name:String!):Book
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    books(root, args, context) {
      return books;
    },
    book(root, args, context, info) {
      return books.filter(book => book.id === args.id)[0];
    }
  },
  Mutation: {
    addBook(root, args, context) {
      return {id: 4, title: args.title};
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const PORT = process.env.NODE_ENV || 4000;
app.listen(PORT, ()=>console.log('app running in http://localhost:' + PORT));
