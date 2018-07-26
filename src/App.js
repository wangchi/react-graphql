import React from 'react';
import { hot } from 'react-hot-loader';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_BOOKS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Book Lists</p>
        <Query query={GET_BOOKS}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            // console.log(data);
            return (
              <ul>
                {
                  data.books.map(book => <li key={book.id}>{book.id}, {book.title}, {book.author}</li>)
                }
              </ul>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default hot(module)(App);
