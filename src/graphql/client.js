import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import store from 'redux/store';
import { showModalOk } from 'redux/appSlice';

import { API_URL_GRAPH } from 'constants/system';

const httpLink = new HttpLink({ uri: `${API_URL_GRAPH}/graphql` });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    console.log(`[Network error]: ${networkError.statusCode}`);
    console.log(`[graphQLErrors error]: ${graphQLErrors[0].message}`);
    if (networkError.statusCode === 403 || networkError.statusCode === 401) {
      // Handle invalid access token
    } else if (!networkError.statusCode) {
      store.dispatch(
        showModalOk({
          title: 'No internet connection',
          content: 'Please check your connection and try again later',
        })
      );
    } else if (networkError.statusCode === 400) {
      throw new Error(graphQLErrors[0].message);
    } else if (graphQLErrors && graphQLErrors.length > 0) {
      const title = 'Oops, something went wrong';
      const content = graphQLErrors[0].message;
      console.error({
        title,
        content,
      });
      store.dispatch(
        showModalOk({
          title: 'Oops, something went wrong',
          content,
        })
      );
    }
  }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache: new InMemoryCache(),
});

export default client;
