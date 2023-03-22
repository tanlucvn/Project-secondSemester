import React from "react";
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "../../node_modules/react-router-bootstrap/";
import Card from "react-bootstrap/Card";
import { getError } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";
import "../CSS/category.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <Nav className='category'>
      <Nav.Item className='category-item-title'>
        <strong className='category-item'>Categories</strong>
      </Nav.Item>
      {categories.map((category) => (
        <Nav.Item key={category}>
          <LinkContainer to={`search:category=${category}`} replace>
            <Nav.Link className='category-nav'>{category}</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ))}
    </Nav>
  );
}
