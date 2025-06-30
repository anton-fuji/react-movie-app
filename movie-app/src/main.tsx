import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import  Header  from './Header.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MovieDetail from './MovieDetail.tsx'

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/movies/:movieId", Component: MovieDetail },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header>
        <RouterProvider router={router}/>
    </Header>
  </StrictMode>,
)
