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
			{ text: "Getting Started", link: "/get-started" },
			{
				text: "Guide",
				items: [
					{ text: "Introduction", link: "/guide/" },
					{ text: "Auth", link: "/guide/auth" },
					{ text: "Products", link: "/guide/products" },
					{ text: "Categories", link: "/guide/categories" },
					{ text: "Cart", link: "/guide/cart" },
					{ text: "Customers", link: "/guide/customers" },
					{ text: "Error Handling", link: "/guide/error" },
				],
			},
			{ text: "Rate limiting", link: "/rate-limiting" },
			{ text: "Changelog", link: "/changelogs" },
			{ text: "Terms & Conditions", link: "/policy" },
			{ text: "Contributors", link: "/contributors" },
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/CommunityPro/ecommerce-api" },
			{ icon: "twitter", link: "https://twitter.com/communitypro47" },
		],
		footer: {
			copyright: "©2023 CommunityPro",
			message: "Released under the MIT License.",
		},
	},
	head: [["link", { rel: "icon", href: "/favicon.png" }]],
})
