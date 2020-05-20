import React, { useEffect, useState } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <ul>
      {products.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

export default ({initialProducts}) => {
  const history = useHistory();
  const params = useParams();
  const [products, setProducts] = useState(initialProducts);
  useEffect(() => {
    fetchProducts({});
  }, []);

  const fetchProducts = ({ category = "all" }) => {
    fetch(`/productData.json?category=${category}`)
      .then((res) => res.json())
      .then(({ products }) => {
        setProducts(products);
      });
  };

  const filterProducts = ({ category }) => {
    history.push(`/products/${category}`);
    fetchProducts({ category });
  };

  return (
    <div>
      <Products products={products} />
      <button onClick={() => filterProducts({ category: "all" })}>
        Alle anzeigen
      </button>
      <button onClick={() => filterProducts({ category: "a" })}>
        Kategorie A
      </button>
      <button onClick={() => filterProducts({ category: "b" })}>
        Kategorie B
      </button>
    </div>
  );
};
