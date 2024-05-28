import React, { useEffect } from 'react';

const Products = () => {
 
  const products = [
    { id: 1, name: 'Pizza', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!', price: 30,quantily:0, image: 'src/assets/imgs/pizza.jpg', },
    { id: 2, name: 'Hamburger', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!', price: 15,quantily:15, image: 'src/assets/imgs/Hamburger.jpg', },
    { id: 3, name: 'Bread', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!', price: 20,quantily:30, image: 'src/assets/imgs/bread.jpg',  },
    { id: 4, name: 'Cake', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!', price: 10,quantily:20, image: 'src/assets/imgs/cake.jpg',  }
    ];

  useEffect(() => {
   
    localStorage.setItem('products', JSON.stringify(products));
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Products;
