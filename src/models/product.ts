interface Product {
    id: number;        // Unique identifier for the product.
    userId: number;    // ID of the user who created the product.
    title: string;     // Product title or name.
    image: string;     // URL or path to the product image.
    price: number;     // Product price.
  }
  
  export default Product;
  