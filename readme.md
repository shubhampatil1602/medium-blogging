## Stack for blogging-website Project is:

- React in the frontend
- Cloudflare workers in the backend
- zod as the validation library, type inference for the frontend types
- Typescript as the language
- Prisma as the ORM, with connection pooling
- Postgres as the database
- jwt for authentication

#### Create a folder on your favourite directory.

- Open Terminal

```
mkdir blogging-website
```

- Copy frontend and backend folders here and Open VS code.
- Open 2 terminals:

1.  Terminal 1

```
cd backend
```

```
npm install
```

2. Terminal 2

```
cd frontend
```

```
npm install
```

- Create `.env` file in backend folder

```
touch .env
```

- Now add the following fields inside `.env`

```
DATABASE_URL=""

JWT_SECRET=""
```

- Now, inside `wrangler.toml` file add the following fields:

```
[vars]
DATABASE_URL=""

JWT_SECRET=""
```
