# Next.js Blog with microCMS

This project is a blog template built with **Next.js 15** and **microCMS** for content management.  
Originally, it used Wisp CMS, but has now been **fully migrated to microCMS**.

## Features

- **CMS Migration:**  
  - All content is now managed via **microCMS** instead of Wisp CMS.
  - API keys and endpoints have been updated accordingly.

- **Routing:**  
  - Blog posts are available at `/blogs/[slug]`.

- **Customization:**  
  - Environment variables are managed via `.env.local` (not included in the repository).

## Environment Variables (.env.local)

Before running the project, create a `.env.local` file and set up the following variables:

```env
NEXT_PUBLIC_BLOG_ID=your-blog-id
NEXT_PUBLIC_BLOG_DISPLAY_NAME=Your Blog Name
NEXT_PUBLIC_BLOG_COPYRIGHT=Your Name or Brand
NEXT_DEFAULT_METADATA_DEFAULT_TITLE=Your Blog Title
NEXT_PUBLIC_BLOG_DESCRIPTION=Your blog description.
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your-microcms-service-domain
NEXT_PUBLIC_MICROCMS_API_KEY=your-microcms-api-key
NEXT_PUBLIC_MICROCMS_ENDPOINT=blog

Installation & Setup
	1.	Install dependencies:

npm i --legacy-peer-deps


	2.	Start the development server:

npm run dev


	3.	Open http://localhost:3000 in your browser to check the blog.

About This Migration
	•	Wisp CMS → microCMS Migration
	•	All CMS-related logic has been refactored for microCMS.
	•	Check the source code for comments detailing the changes.

This is a simple and customizable Next.js + microCMS blog template.
Feel free to use it for your own projects! 🚀
