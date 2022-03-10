This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create .env.local file and add the following code:

```bash
    MONGO_URI = <YOUR_MONGO_DB_URI>
    JWT_SECRET = <SOME_STRONG_SECRET_KEY>
    UPLOAD_PATH = <THE_PATH_TO_STORE_THE_UPLOADED_FILES>
```

Install dependencies:

```bash
npm i
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:2233](http://localhost:2233) with your browser to see the result.
