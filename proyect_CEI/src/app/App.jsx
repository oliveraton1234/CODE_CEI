import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Router from './configs/Router.jsx'
import { Provider } from 'react-redux';
import store from './logic/store.js';

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
