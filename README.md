# Discord and Wagmi oAuth Starter Kit

<img src="public/og.jpg">

This repository contains a Next.JS application, using  Next.JS's [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and is deployable on [Vercel](https://vercel.com/); moreover, it is used to connect the application to MetaMask using [Wagmi](https://wagmi.sh/) and stores off-chain data into a [PostgreSQL](https://www.postgresql.org/) database using [Supabase](https://supabase.com/).

## Getting Started

### Step 1

Wagmi requires an infrastructure provider for connecting Web3 wallets to this applicaton (ie. MetaMask). 

To leverage Wagmi, complete the following steps:

1. [Sign-up](https://www.alchemy.com/) and create an Alchemy account
2. Create an app
3. Copy and save the app's API key

### Step 2

For managing application-specific data off-chain (ex. MetaMask wallet address), we use Supabase.

To use Supabase, complete the following steps:

1. [Sign-up](https://supabase.com/) and create a Supabase account
2. Create a project
3. Copy and sve your Project's API Key and URL from your Supabase account's project settings
4. Complete [Database Configuration](#database-configuration)

### Step 3

To connect to a server, verify an accounts membership, and use Discord's API, complete the following steps:

1. [Sign-up](https://discord.com/developers/) or log into Discord Developers
2. Create an application
3. Update your OAuth2 settings; specifically: redirects (ex. `http://localhost:3000`)
4. Using OAuth2's URL Generator, create a URL using scopes (ie. `identify`, `email`, and `guilds`) and your previously created Generated URL (ex. `http://localhost:3000`)
5. Copy and save your Application's Name and the generated OAuth2 URL

Note, add your production URL to your Discord Application's Redirects and update your production environment variable on Vercel using this OAuth2 URL. Also, be sure that the URL's `response_type` equals `token` (ex. `response_type=token`).

### Step 4

Using your copy and saved Alchemy, Discord, and Supabase keys, complete the following steps to run this application:

1. Clone this repository
2. Copy `.env.sample` and rename it to `.env`
3. Update your environment variables file (`.env`) using your copy and saved key values
4. Run `npm install` and then `npm run dev`
5. View your landing page on `localhost:3000`

### Deploying with Vercel (Optional)

Optionally, this application can be deployed using Vercel's [Deploy Now](https://vercel.com/docs/deploy-button):

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsurgieboi%2Fsesame-coding-assignment&env=NEXT_PUBLIC_ALCHEMY_API_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_DISCORD_NAME,NEXT_PUBLIC_DISCORD_OAUTH2_URL"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

Note, deploying to Vercel does not require any knowledge of Javascript, Next.js or software development; however, all required environment variables are needed to successfully deploy this application.

## Environment Variables

The list of environment variables needed to run this application:

| Variable        | Description           | Example  |
| ------------- |-------------| -------------|
| NEXT_PUBLIC_ALCHEMY_API_KEY      | Alchemy API Key      |   `JHrf267hpy2bGYwznCRLLmqjM8OiZwud` |
| NEXT_PUBLIC_SUPABASE_URL      | Supabase Project URL      |   `https://jqjacvbfijzddisqeapw.supabase.co` |
| NEXT_PUBLIC_SUPABASE_ANON_KEY     | Supabase Project API Key      |   `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxamFjdmJmaWp6ZGRpc3FlcW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1ODM2NTIsImV4cCI6MTk5MDE1OTY1Mn0.UrJ16g55euh8mRftMIyt7pv4hj0SYGZKwGbUHj2I9oP` |
| NEXT_PUBLIC_DISCORD_NAME      | Discord Application Name      |   `Sesame` |
| NEXT_PUBLIC_DISCORD_OAUTH2_URL      | Discord Application OAuth2 URL      |   `https://discord.com/api/oauth2/authorize?client_id=1067253927890975117&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20email%20guilds` |

## Database Configuration

To store data off-chain (ex. MetaMask wallet address), complete the following database configurations:

### Create Wallets Table

Create a table for storing connected wallet data using the following schema:

| Name        | Type           | Default Value  | Is Nullable   | Is Unique   |
| ------------- |-------------| -------------| -------------| -------------|
| wallet        | text           | Empty or Null  | false  | true   |
| is_connected        | boolean           | false | false  | false   |
| is_verified        | boolean           | false | false  | false   |
| coupon_code        | text           | Empty or Null | true  | false   |

Note, ensure that Row Level Security (RLS) is enabled.

### Update Table Policy

In order to read and write data, create a database table Policy from your Supabase project's Authentication page (ex. `https://app.supabase.com/project/<YOUR_PROJECT_ID>/auth/policies`).

## Contributing

Feel free to fork, submit pull requests and contribute.

## Questions

If you have any questions, feel free to email me at: [sergio.m.villasenor@gmail.com](mailto:sergio.m.villasenor@gmail.com).