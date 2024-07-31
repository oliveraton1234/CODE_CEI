import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Router from './configs/Router.jsx'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  )
}

export default App
