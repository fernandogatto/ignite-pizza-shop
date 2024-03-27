import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './routes'
import './global.css'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Pizza Shop" />

        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
