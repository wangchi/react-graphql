import React from 'react';
import { hot } from 'react-hot-loader/root';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_BOOKS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <p>Book Lists</p>
      <ul>
        {data.books.map(book => (
          <li key={book.id}>
            {book.id}, {book.title}, {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default hot(App);
