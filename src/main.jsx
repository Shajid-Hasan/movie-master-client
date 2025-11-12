import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root.jsx'
import Home from './Pages/Home/Home.jsx'
import AllMovies from './Components/All Movies/AllMovies.jsx'
import MyCollections from './Components/My Collection/MyCollections.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Context/AuthProvider.jsx'
import MovieDetails from './Components/Movie Details/MovieDetails.jsx'
import AddMovie from './Components/Add Movie/AddMovie.jsx'
import PrivetRoute from './Privet Route/PrivetRoute.jsx'
import UpdateMovie from './Components/Update Movie/UpdateMovie.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/allmovies',
        Component: AllMovies,
      },
      
      {
        path: '/mycollections',
        element: (
          <PrivetRoute>
            <MyCollections/>
          </PrivetRoute>
        ) 
      },
      {
        path: '/addmovie',
        element: (
          <PrivetRoute>
            <AddMovie/>
          </PrivetRoute>
        ) 
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/details',
        Component: MovieDetails
      },
      {
        path: '/details/:id',
        Component: MovieDetails
      },
      {
        path: '/updatemovie',
        Component: UpdateMovie
      },
      {
        path: '/update',
        Component: UpdateMovie
      },
      {
        path: '/update/:id',
        Component: UpdateMovie
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
