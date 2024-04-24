import React, { useEffect, useState } from "react";
import { BrowserRouter as Router , Routes, Route, Link, Navigate } from "react-router-dom";
import './usercss/user.css'; 
import './style.css'; 

import CreateUser from "./components/user/create.js";
import Login from "./components/user/login.js";
import CreateProduct from "./components/product/create.js";
import CreateBlog from "./components/blog/create.js"
import Category from "./components/blog/category.js"
import BlogList from "./components/blog/list.js"
import Tags from "./components/blog/tags.js"
import { isAuthenticated } from './authService';

function App() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const result = await isAuthenticated();
        console.log(result);
        setAuthenticated(result);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthenticated(false); // Set authenticated to false in case of an error
      }
    };

    checkAuthentication();
  }, [authenticated]);

  if (authenticated === null) {
    // Loading state, you can display a loading spinner or something else
    return null;
  }

  return (
    <>
      <Router>
        

       
              <Routes>
                
      
                <Route path="/user/create" element={<CreateUser />} />
                <Route path="/login" element={<Login />} />

              
                {authenticated ? (
                  <Route path="/product/create" element={<CreateProduct />} />
                ) : (
                  <Route path="/product/create" element={<Navigate to="/login" replace />} />
                )}

              {authenticated ? (
                  <Route path="/blog/create" element={<CreateBlog />} />
                ) : (
                  <Route path="/blog/create" element={<Navigate to="/login" replace />} />
                )}

    `           {authenticated ? (
                  <Route path="/blog/category" element={<Category />} />
                ) : (
                  <Route path="/blog/category" element={<Navigate to="/login" replace />} />
                )}
                   {authenticated ? (
                  <Route path="/blog" element={<BlogList />} />
                ) : (
                  <Route path="/blog" element={<Navigate to="/login" replace />} />
                )}
                   {authenticated ? (
                  <Route path="/blog/tags" element={<Tags />} />
                ) : (
                  <Route path="/blog/tags" element={<Navigate to="/login" replace />} />
                )}
  
              </Routes>
           
      </Router>
    </>
  );
}

export default App;
