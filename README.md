# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Installing dependencies

Make sure to use pnpm only, as latest shadcn doesn't work properly with npm (in my experience).
```shellscript
pnpm i
```
If remix does not install dev dependencies run:
```shellscript
pnpm i @remix-run/node@pre @remix-run/react@pre @remix-run/serve@pre @remix-run/dev@pre @remix-run/eslint-config@pre
```

## Approach
I chose shadcn and zod for form creation and error handling since both works together seamlessly.
Countries list is hard coded to save unnecessary api calls and waiting period.
We are storing the form data in local storage with expiry to persist data. However card details are prevented to store in storage for security reasons.
The one other features thats been added is if you notice in first step, when you press enter you don't directly submit the form, instead you go to the next input, once all fields are visited then you submit the form on Enter.


## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
