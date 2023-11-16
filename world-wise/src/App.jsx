import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";

// import Homepage from "./pages/Homepage/Homepage";
// import Product from "./pages/Product/Product";
// import Pricing from "./pages/Pricing/Pricing";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
// import AppLayout from "./pages/AppLayout/AppLayout";
// import Login from "./pages/Login/Login";

///////// BEFORE LAZY LOADING
// dist/assets/index-eb0351f0.css   31.32 kB │ gzip:   5.22 kB
// dist/assets/index-f35b037a.js   528.17 kB │ gzip: 149.65 kB

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Login = lazy(() => import("./pages/Login/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

///////// AFTER LAZY LOADING
// dist/assets/index-0fa21dd1.css           27.65 kB │ gzip:   4.53 kB
// dist/assets/AppLayout-fd6b962f.js       156.94 kB │ gzip:  46.12 kB
// dist/assets/index-cf6862f0.js           369.61 kB │ gzip: 103.00 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
