import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CarDetails from './pages/CarDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Copyright from './pages/Copyright'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCars from './pages/admin/Cars'
import AdminNewCar from './pages/admin/NewCar'
import AdminEditCar from './pages/admin/EditCar'
import AdminPricing from './pages/admin/Pricing'
import AdminDiscounts from './pages/admin/Discounts'
import AdminSettings from './pages/admin/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/catalog',
    element: <Catalog />,
  },
  {
    path: '/catalog/:id',
    element: <CarDetails />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/copyright',
    element: <Copyright />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/cars',
    element: <AdminCars />,
  },
  {
    path: '/admin/cars/new',
    element: <AdminNewCar />,
  },
  {
    path: '/admin/cars/:id',
    element: <AdminEditCar />,
  },
  {
    path: '/admin/pricing',
    element: <AdminPricing />,
  },
  {
    path: '/admin/discounts',
    element: <AdminDiscounts />,
  },
  {
    path: '/admin/settings',
    element: <AdminSettings />,
  },
])