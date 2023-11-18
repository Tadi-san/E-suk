import Layout from "./layout"
import React from "react"
import axios from 'axios'
import { Route,Routes } from "react-router-dom"
import { ReactDOM } from "react"
import Registerpage from "./pages/registerpage"
import AccountPage from "./pages/account"
import LoginPage from "./pages/LoginPage"
import { UserContextProvider } from "./usercontext"
import AddItems from "./pages/additemsformpage"
import Indexpage from "./pages/Indexpage"
import SingleItem from "./pages/itempage"
import Subpages from "./pages/catagoriesubpage"
import SearchPage from "./pages/searchpage"


// axios.defaults.baseURL = "http://localhost:5000"
// axios.defaults.withCredentials =true 
axios.defaults.baseURL = "https://e-suk.vercel.app"
axios.defaults.withCredentials = true
function App() {
  

  return (
   <UserContextProvider>
               <Routes>
                  <Route path='/' element = {<Layout />}>
                     <Route path="/login" element ={<LoginPage />} />
                     <Route path="/register" element ={<Registerpage />} />
                     <Route path="/"  element ={<Indexpage />} />
                     <Route path="/add-items" element = {<AddItems />} />
                     <Route path="/account/:subpage?" element = {<AccountPage /> } />
                     <Route path="/account/posted/:id" element = {<AddItems />} />
                     <Route path="/item/:id" element={<SingleItem />}/>  
                     <Route path="/:subpage" element ={<Subpages />} /> 
                     <Route path="/search/:tosearch" element={<SearchPage />} />                 
               </Route>

               </Routes>
   </UserContextProvider>
 
    )}

export default App
