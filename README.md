# Next.js SaaS Starter with Stripe & Authentication

A complete, production-ready SaaS template built with Next.js 14, TypeScript, Tailwind CSS, and Stripe payments.

Launch your SaaS in minutes, not months.

## Features

✨ **Authentication**
- Email/password signup & login
- Google OAuth
- GitHub OAuth
- NextAuth.js configuration ready

💳 **Stripe Payments**
- Subscription management
- Multiple pricing tiers
- Webhook handling
- Payment success/cancel pages

🎨 **Beautiful UI**
- Responsive design
- Tailwind CSS styling
- Pre-built components
- Hero, pricing, dashboard pages

🗄️ **Database**
- Prisma ORM
- SQLite (development)
- PostgreSQL ready (production)
- User & subscription models

🔐 **Secure**
- Environment variables
- NextAuth protected routes
- Stripe webhook verification
- Type-safe with TypeScript

## What's Included

```
src/

├── app/

│   ├── (auth)/ - Login & signup pages

│   ├── (dashboard)/ - Protected dashboard

│   ├── api/ - NextAuth & Stripe endpoints

│   ├── pricing/ - Pricing page with checkout

│   ├── layout.tsx

│   └── page.tsx

├── components/ - Reusable UI components

├── lib/ - Utilities (auth, db, stripe)

└── types/ - TypeScript definitions
```

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd saas-starter
npm install
```

### 2. Set Up Environment

Create `.env` file:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Pages

- **Homepage** (`/`) - Hero & features
- **Pricing** (`/pricing`) - Plans with Stripe checkout
- **Signup** (`/signup`) - Create account
- **Login** (`/login`) - Sign in
- **Dashboard** (`/dashboard`) - Protected user dashboard
- **Success** (`/success`) - Payment success page
- **Cancelled** (`/cancelled`) - Payment cancelled page

## Authentication

### Email/Password
Signup page at `/signup` with password hashing via bcryptjs

### OAuth
- Google login ready (configure in Stripe dashboard)
- GitHub login ready (configure in Stripe dashboard)

## Stripe Setup

### 1. Create Stripe Account
https://stripe.com

### 2. Create Products

Go to **Products** and create:

**Starter Plan**
- Price: $29/month
- Copy Price ID

**Pro Plan**
- Price: $99/month
- Copy Price ID

### 3. Update Pricing Page

In `src/app/pricing/page.tsx`, update price IDs:

```typescript
onClick={() => handleCheckout('price_YOUR_STARTER_ID')}
onClick={() => handleCheckout('price_YOUR_PRO_ID')}
```

### 4. Setup Webhooks

**For local testing:**
```bash
npm install -g ngrok
ngrok http 3000
```

**In Stripe Dashboard:**
1. Go to **Developers → Webhooks**
2. Add endpoint: `https://your-ngrok-url/api/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret to `.env`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to https://vercel.com
3. Import repository
4. Add environment variables
5. Deploy!

**One command deployment:**
```bash
vercel deploy
```

### PostgreSQL (Production)

Update `.env.production`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/saas"
```

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma + SQLite/PostgreSQL
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **Deployment:** Vercel

## Project Structure

```
saas-starter/

├── src/

│   ├── app/                 # App router pages

│   ├── components/          # Reusable components

│   ├── lib/                 # Utilities & config

│   └── types/               # TypeScript types

├── prisma/

│   ├── schema.prisma        # Database schema

│   └── dev.db               # SQLite database

├── public/                  # Static files

├── .env.example             # Environment template

├── package.json

├── tsconfig.json

├── tailwind.config.ts

└── LICENSE
```

## Customization

### Change Branding
- Update logo in `Header.tsx`
- Update colors in `tailwind.config.ts`
- Modify copy in pages

### Add Features
- New dashboard widgets
- Additional OAuth providers
- Email notifications
- Analytics

### Database Schema
Modify `prisma/schema.prisma` then run:
```bash
npx prisma migrate dev --name describe_change
```

## Troubleshooting

**Tailwind not showing?**
```bash
rm -rf .next
npm run dev
```

**Database errors?**
```bash
npx prisma generate
npx prisma db push
```

**Stripe webhooks not firing?**
- Make sure ngrok is running
- Verify webhook secret in `.env`
- Check recent deliveries in Stripe dashboard

## Support

For issues:
1. Check `.env` is configured
2. Verify Stripe API keys
3. Ensure database is initialized
4. Check server logs for errors

## License

MIT License - see LICENSE.md for details

### Third-Party Libraries

- **Next.js** - MIT License
- **Tailwind CSS** - MIT License
- **Prisma** - Apache 2.0 License
- **NextAuth.js** - ISC License
- **Stripe** - Apache 2.0 License

## What You Can Do

✅ Use for personal projects</br>
✅ Build commercial SaaS</br>
✅ Modify and customize</br>
✅ Resell as modified template/<br>
✅ Use in production

❌ Resell unchanged</br>
❌ Claim you built the original

## Getting Help

- Docs: https://nextjs.org, https://stripe.com/docs
- Issues: Check GitHub discussions
- Community: Next.js Discord, Stripe forums

## Version

- Next.js 14+
- Node.js 18+
- npm 9+

---

Happy building! 🚀

Made with ❤️ by Rakshitha Naik