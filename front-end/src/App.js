import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SearchItems from "./components/SearchItems";
import SearchProducts from "./components/SearchProducts";
import About from "./components/About";
import Discounted from "./components/Discounted";
import Product from "./components/Product";
import CategoriesItem from "./components/CategoriesItem";
import Category from "./components/Category";

const App = (props) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchP, setSearchP] = useState([]);
  const [free, setFree] = useState([]);

  const [info, setInfo] = useState([
    { name: 'Alaa Khalila', position: 'Full-Stack Dev', phone: '0795846987', email: 'Alaa@gmail.com' },
    { name: 'Fadi Al-fuqaha', position: 'Full-Stack Dev', phone: '0785846987', email: 'Fadi@gmail.co' },
    { name: 'Omar Alkhatib', position: 'Full-Stack Dev', phone: '0775846987', email: 'Omar@gmail.com' },
    { name: 'Shehadeh Almomani', position: 'Full-Stack Dev', phone: '0795846988', email: 'Shehadeh@gmail.com' }
  ]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products')
      await setProducts(res.data);
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  }

  const oneProduct = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`)
      await setProduct(res.data);
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  }

  const discount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/discounted')
      await setDiscountedProducts(res.data);
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  }

  const searchProducts = async (i) => {
    try {
      const res = await axios.get(`http://localhost:5000/searchProducts/${i}`)
      if (res.data.length) {
        await setSearchP(res.data);
      } else {
        return "Not found";
      }
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  };

  const getCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/categories')
      await setCategories(res.data);
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  };

  const productsCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/categories/${id}`)
      await setCategory(res.data);
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  };

  const getFreeProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/freeDelivery')
      console.log('res.data.free :', res.data)
      await setFree(res.data);
    }
    catch (err) {
      console.log('ERR: ', err);
    };
  };

  useEffect(() => {
    getFreeProducts()
    getAllProducts()
    discount()
    searchProducts()
    oneProduct()
    getCategories()
    productsCategory()
  }, []);

  return (
    <Router>

      <div>
      <NavBar />
      </div>

      <div>
        <Link to="/searchProducts"><SearchItems search={searchProducts} /></Link>
      </div>

      <div>
      <Home products={products} product={product} categories={categories} category={category} categoryId={productsCategory} free={free} />
      </div>

      <Route path="/about" render={(props) => <About {...props} {...info} />} />
      <Route path="/discount" render={(props) => <Discounted {...props} {...discountedProducts} product={oneProduct} />} />
      <Route path="/searchProducts" render={(props) => <SearchProducts {...props} {...searchP} search={searchProducts} product={oneProduct} />} />
      <Route path="/product/:id" render={(props) => <Product {...props} products={products} />} />
      {/* <Route path="/category/:i" render={(props) => <Category {...props} />} /> */}
      <Route path="/category/:i" render={(props) => <Category {...props} category={category} />} />
      {/* <CategoriesItem setUsername={setCategory} /> */}
      {/* <Category category={category} /> */}
    </Router>
  );
};

export default App;
