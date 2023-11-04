import { defineConfig } from "vitepress"

export default defineConfig({
	title: "eCommerce API",
	description: "Documentation for the CommunityPro eCommerce API",
	themeConfig: {
		logo: "/community-pro.png",
		siteTitle: "eCommerce API",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "About", link: "/about" },
			{ text: "Docs", link: "/get-started" },
		],
		sidebar: [
			{
				text: "About",
				link: "/about",
			},
			{
				text: "Introduction",
				items: [
					{ text: "Getting Started", link: "/get-started" },
					{ text: "Usage", link: "/usage" },
				],
			},
			{
				text: "Guide",
				items: [
					{ text: "Guide", link: "/guide/" },
					{ text: "Auth", link: "/guide/auth" },
					{ text: "Products", link: "/guide/products" },
					{ text: "Categories", link: "/guide/categories" },
					{ text: "Cart", link: "/guide/cart" },
					{ text: "Users", link: "/guide/users" },
				],
			},
		],
		socialLinks: [{ icon: "github", link: "https://github.com/CommunityPro/ecommerce-api" }],
	},
})
