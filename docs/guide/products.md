# Products

This page documents the API endpoints for managing products.

### Add Product

```js
const product = {
  name: 'Product Name',
  description: 'Product description',
  slug: 'product-slug',
  price: 19.99,
  quantity: 10,
  assets: [
    File: './product-image.jpg',
  ],
  category: 'category-id'
}

const response = await fetch('/api/v1/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
})
```

### Update Product

### Get All Products

### Get Product By ID

### Delete Product
