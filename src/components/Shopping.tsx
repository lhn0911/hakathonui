import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantily: number; 
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}


export default function Shopping() {
  const [notification, setNotification] = useState<{ message: string; type: string }>({ message: '', type: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addToCart = (productId: number, productName: string, productPrice: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setNotification({ message: 'Added to cart successfully', type: 'success' });
  };

  const renderCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    return (
      <tbody id="my-cart-body">
        {cart.map((item, index) => (
          <tr key={item.id}>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>{item.price} USD</td>
            <td>
              <input
                name={`cart-item-quantity-${item.id}`}
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
              />
            </td>
            <td>
              <button
                className="label label-info update-cart-item"
                onClick={() => updateCartItem(item.id, item.quantity)}
              >
                Update
              </button>
              <button
                className="label label-danger delete-cart-item"
                onClick={() => deleteCartItem(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const updateCartItem = (productId: number, newQuantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    setNotification({ message: 'Update successfully', type: 'warning' });
  };

  const deleteCartItem = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    setNotification({ message: 'Delete successfully', type: 'danger' });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              {products.map((product) => (
                <div key={product.id} className="media product">
                  <div className="media-left">
                    <a href="#">
                      <img className="media-object" src={product.image} alt={product.name} />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{product.name}</h4>
                    <p>{product.description}</p>
                    {product.quantily === 0 ?'':<input
                       name="quantity-product-1"
                       type="number"
                       value={1}
                        
                      />
                      }
                    {product.quantily === 0 ? (
                      <span className="price">{product.price} USD</span>
                    ) : (
                      <a onClick={() => addToCart(product.id, product.name, product.price)} data-product="1" className="price">{product.price} USD</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
    <div className="panel panel-danger">
      <div className="panel-heading">
        <h1 className="panel-title">Your Cart</h1>
      </div>
      <div className="panel-body">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>STT</th>
              <th>Name</th>
              <th style={{ width: "15%" }}>Price</th>
              <th style={{ width: "4%" }}>Quantity</th>
              <th style={{ width: "25%" }}>Action</th>
            </tr>
          </thead>
          {renderCartFromLocalStorage()}
          {notification.message && (
            <tfoot>
              <tr>
                <td colSpan={5}>
                  <div className={`alert alert-${notification.type}`} role="alert">
                    {notification.message}
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  </div>
      </div>
    </div>
  );
}