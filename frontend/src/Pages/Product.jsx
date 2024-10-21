import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Discription from '../Components/Discription/Discription';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Product = () => {
  const { allProducts } = useContext(ShopContext);  // Changed from all_product to allProducts
  const { productId } = useParams();

  // Ensure allProducts is defined and check if the product exists
  if (!allProducts || allProducts.length === 0) {
    return <div>Loading...</div>; // You can show a loading spinner or message here
  }

  const product = allProducts.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <Discription />
      <RelatedProduct />
    </div>
  );
};

export default Product;
