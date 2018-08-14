const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');

// Fake Data
let incrementID = 2;
const BOOKS = [
  {
    id: 1,
    title: 'HTML5 Tutorial',
    author: 'xiaowang'
  },
  {
    id: 2,
    title: 'Deep Learning With React',
    author: 'xiaoli'
  }
];

// 创建数据模型
const typeDefs = gql`
  type Book{
    id: Int!
    title: String
    author: String
  }
  type Query {
    books: [Book]
    book(id: Int!):Book
  }
  type Mutation {
    addBook(title: String!, author: String!):Book
    updateBook(id: Int!, title: String, author: String):Book
    deleteBook(id: Int!):Book
  }
`;

// 为数据模型创建解析函数
const resolvers = {
  Query: {
    books(root, args, context) {
      return BOOKS;
    },
    book(root, args, context, info) {
      return BOOKS.filter(book => book.id === args.id)[0];
    }
  },
  Mutation: {
    addBook(root, args, context) {
      let newBook = {id: ++incrementID, ...args};
      // fake add book
      BOOKS.push(newBook);
      return newBook;
    },
    updateBook(root, args, context) {
      let modifiedBook = {};
      // fake update book
      BOOKS.forEach(book => {
        if (book.id === args.id) {
          Object.assign(book, args);
          modifiedBook = book;
        }
      });
      return modifiedBook;
    },
    deleteBook(root, args, context) {
      let deletedBook = {};
      BOOKS.forEach((book, i) => {
        if (book.id === args.id) {
          BOOKS.splice(i, 1);
          deletedBook = book;
        }
      });
      return deletedBook;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
