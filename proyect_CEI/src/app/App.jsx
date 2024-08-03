import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Router from './configs/Router.jsx'
import { Provider } from 'react-redux';
import store from './logic/store.js';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
