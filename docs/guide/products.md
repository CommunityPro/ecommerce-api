# Products

This page documents the API endpoints for managing products.

## Add Product

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

## Update Product

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
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
  body: JSON.stringify(product)
})
```

## Get All Products

```js
const response = await fetch("/api/v1/products?limit=10&page=1", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
})
```

## Get Product By ID

```js
const response = await fetch("/api/v1/products/<product-id>", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
})
```

## Delete Product

```js
const response = await fetch("/api/v1/products/<product-id>", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
})
```
