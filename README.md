This is my personal photography blog system developed by **React.js**, **Next.js** and **TypeScript**.

## Introduction
[Website Link](https://vicharm-life.com/)

I have designed a blog system, which helps me write articles and manage them.
1. When I new an article in Markdown format, blog system will show this article on the website.
2. Let my websites support tracking event, so I can know the information about views, completion rate, etc.
3. Let my websites support RWD.
4. Defined some custom variables to support features like adding Google Map iframe, showing an article's tag, etc.

## Tech Stack
1. React.js
2. Next.js
3. SCSS
4. [Amplitude](https://amplitude.com/)
5. [Netlify](https://www.netlify.com/)

## Technical detail
1. Write articles with Markdown format
2. Transform markdown to be HTML string by [unified](https://www.npmjs.com/package/unified), [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype)
3. Inject HTML string into Next.js page
4. Use [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) to generate pages in build time by Next.js
5. When I push new commit into Github, it will deploy on Netlify automatically.
