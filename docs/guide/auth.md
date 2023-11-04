# Authentification

This page explains how authentication works with the CommunityPro eCommerce API.

## Signup

```js
const payload = {
	name: "John Doe",
	email: "john.doe@example.com",
	password: "rxGJhj12_Q2",
	image: File,
}

const response = await fetch("/api/v1/auth/signup", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(payload),
})
```

## Signin

```js
const payload = {
	email: "john.doe@example.com",
	password: "rxGJhj12_Q2",
}

const response = await fetch("/api/v1/auth/signin", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(payload),
})
```

## API Key
