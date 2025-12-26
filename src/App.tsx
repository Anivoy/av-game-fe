import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router"
import { ScrollToTop } from "@/components/common/ScrollToTop"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "sonner";

import MainRoutes from "@/routes"
const queryClient = new QueryClient()

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>
          <ScrollToTop />
          <MainRoutes />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
