import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Discription from '../Components/Discription/Discription';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Product = () => {
  const {all_product}= useContext(ShopContext);
  const {productId} = useParams();
  const Product = all_product.find((e)=> e.id===Number(productId));
  return (
    <div>
      <Breadcrum product={Product} />
      <ProductDisplay product={Product} />
      <Discription/>
      <RelatedProduct/>
    </div>
  )
}

export default Product
