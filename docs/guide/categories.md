# Categories

This page documents the API endpoints for managing category categories.

## Add Category

```js
const category = {
	name: "Category Name",
	description: "category description",
	slug: "category-slug",
}

const response = await fetch("/api/v1/categories", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
	body: JSON.stringify(category),
})
```

## Update Category

```js
const category = {
	id: "<category-id>",
	name: "category Name",
	description: "category description",
	slug: "category-slug",
}

const response = await fetch("/api/v1/categories", {
	method: "PATCH",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
	body: JSON.stringify(category),
})
```

## Get All Categories

```js
const response = await fetch("/api/v1/categories?limit=10&page=1", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
	body: JSON.stringify(category),
})
```

## Get Category By ID

```js
const response = await fetch("/api/v1/categories/<category-id>", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
})
```

## Delete Category

```js
const response = await fetch("/api/v1/categories/<category-id>", {
	method: "DELETE",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
})
```
