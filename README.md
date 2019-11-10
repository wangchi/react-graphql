# React GraphQL Starter

Use GraphQL in React Koa project

## Usage

```
npm install
npm start
```

Visit GraphQL Server at `http://127.0.0.1:4000/graphql`

Visit React App at `http://127.0.0.1:4001`

## Use Case

query all

```graphql
query {
  books {
    id
    title
    author
    date
  }
}
```

query one

```graphql
query {
  book(id: 1) {
    id
    title
    author
    date
  }
}
```

mutation, add data

```graphql
mutation {
  addBook(title: "Hello GraphQL", author: "Tom") {
    id
    title
    author
    date
  }
}
```

mutation, update data

```graphql
mutation {
  updateBook(id: 1, title: "HTML5 Tutorial Pro", author: "Tom") {
    id
    title
    author
    date
  }
}
```

mutation, delete data

```graphql
mutation {
  deleteBook(id: 1) {
    id
    title
    author
  }
}
```

## LICENSE

[MIT License](./LICENSE)
