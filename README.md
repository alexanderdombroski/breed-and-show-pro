# Breed and Show Pro

A project to learn and experiment with Web Development technologies in our Full-Stack Fundamentals class

- [Astro](https://astro.build/)
- [Svelte](https://svelte.dev/)
- [Better Auth](https://better-auth.com/)
- [Bits Ui](https://bits-ui.com/)
- [Mongo DB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/)

And many more.

## Project Structure

This is a monorepo with two frontends combined into one.

```text
packages/
┣ backend/
┣ breeder/
┣ exhibitor/
┗ shared/
```

- **Backend**: Node/Express server hosted on render to interact with MongoDB Atlas
- **Breeder**: Astro/Svelte frontend for pig breeders
- **Exhibitor**: Astro/Svelte frontend for pig exhibitors
- **Shared**: Shared components and types to be used in multiple packages

_After completing two projects that use a client/server monorepo setup with astro on the frontend, I've concluded the [sleep outside](https://github.com/alexanderdombroski/sleep-outside) setup is much more feasible. Having two astro setups adds a layer of complexity with little benefit._

- [Breeder Site](https://alexanderdombroski.github.io/breed-and-show-pro/breeder/)
- [Breeder Package](https://github.com/alexanderdombroski/breed-and-show-pro/tree/main/packages/breeder)
- [Exhibitor Site](https://alexdombroski.com/breed-and-show-pro/exhibitor/)
- [Exhibitor Package](https://github.com/alexanderdombroski/breed-and-show-pro/tree/main/packages/exhibitor)

## Setup and Installation Instructions

1. `pnpm i`
2. Add env variables to backend
3. `pnpm run dev` to run backend and frontends

```bash
BETTER_AUTH_SECRET="<random-secret>" # openssl rand -base64 50
BETTER_AUTH_URL="http://localhost:3000" # Or production server url
GOOGLE_CLIENT_ID="<client-secret>"
GOOGLE_CLIENT_SECRET="<client-id>"
MONGO_URI="mongodb://localhost:27017" # Or mongoDB atlas cluster
DATABASE_NAME="breed-and-show-pro"
NODE_ENV="development"
```

### Other scripts

- `pnpm -r run check-types` to run tsc, svelte, and astro type linting
- `pnpm -r run build` to create the static build
