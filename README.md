# Reecota by Kaur - Women's Ethnic Wear E-Commerce Store

A premium e-commerce platform for hand-painted suits, sarees, and coord sets built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**.

##  Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **CMS**: Sanity with custom schema
- **Authentication**: Clerk
- **Payment**: Stripe
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Sanity dataset

##  Project Structure

`
reccota_by_kaur/
 app/                          # Next.js app router
    layout.tsx               # Root layout
    page.tsx                 # Homepage
    collections/             # Collections page
    globals.css              # Global styles
    favicon_io/              # Favicon files
 components/                   # React components
    Header.tsx               # Header with auth
    Footer.tsx               # Footer
    CartIcon.tsx             # Cart component
    SearchBar.tsx            # Search functionality
    HeaderMenu.tsx           # Navigation menu
    MobileMenu.tsx           # Mobile navigation
    Logo.tsx                 # Brand logo
    FavoriteButton.tsx       # Wishlist button
    SignIn.tsx               # Sign in component
    HomeBanner.tsx           # Hero banner
    ui/                      # shadcn/ui components
 sanity/                       # Sanity configuration
    schemaTypes/             # Schema definitions
       productType.ts       # Product schema
       categoryType.ts      # Category schema
       brandType.ts         # Brand schema
       orderType.ts         # Order schema
       addressType.ts       # Address schema
       index.ts             # Schema exports
    sanity.config.ts         # Sanity configuration
 lib/                          # Utilities
 constants/                    # Constants and data
 assets/                       # Static assets
 public/                       # Public files
 middleware.ts                # Clerk middleware
 next.config.ts               # Next.js config
 tailwind.config.ts           # Tailwind config
 package.json                 # Dependencies
`

##  Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Sanity account and project
- Clerk account for authentication
- Stripe account for payments

### 1. Clone & Install Dependencies

`ash
git clone <repository-url>
cd reccota_by_kaur
npm install
`

### 2. Environment Variables

Create a .env.local file in the root directory:

`env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
`

### 3. Sanity Setup

`ash
cd sanity
npm install
npm run dev
`

Access Sanity Studio at http://localhost:3333

### 4. Start Development Server

`ash
npm run dev
`

Visit http://localhost:3000

---

##  Schema Types Overview

### 1. **Product** (productType.ts)
Represents individual clothing items in the store.

**Fields:**
- 
- title - Product name (required)
- slug - URL-friendly identifier
- images - Array of product images
- description - Detailed product description
- price - Price in INR
- discount - Discount percentage (0-100%)
- productType - Type: Saree, Suit, Coord Set, Lehenga, Kurti, Dupatta
- sizes - Available sizes: XS, S, M, L, XL, XXL, Free Size
- colors - Array of available colors
- material - Fabric type (Silk, Cotton, Georgette, Chanderi, Linen, Crepe, Velvet, Jacquard, Blended)
- careInstructions - How to care for the product
- occasion - Occasion type: Casual, Formal, Wedding, Festival, Party, Ethnic Wear
- categories - References to category documents
- rand - Reference to brand document
- stock - Available quantity
- status - New, Best Seller, Sale, Limited Edition
- isFeatured - Display on homepage

### 2. **Category** (categoryType.ts)
Organizes products by type and collection.

**Key Fields:** title, slug, description, image, priceRange, sizeOptions, materials, occasion, featured, displayOrder

### 3. **Brand** (randTypes.ts)
Represents the store brand or designers.

**Key Fields:** title, slug, description, logo, image, website, yearFounded, foundedBy, isFeatured

### 4. **Order** (orderType.ts)
Records customer purchases and payment information.

**Key Fields:** orderNumber, stripeCheckoutSessionId, stripeCustomerId, clerkUserId, customerName, email, products (with size, color, priceAtPurchase), totalPrice, currency, address, status, orderDate

### 5. **Address** (ddressType.ts)
Stores customer shipping addresses (India-specific).

**Key Fields:** name, fullName, phoneNumber, email, address, landmark, city, state (Indian states dropdown), pinCode, default, createdAt

---

##  Getting Started with Sanity Studio

### Adding a New Product

1. Go to Sanity Studio (http://localhost:3333)
2. Click **Products** in the sidebar
3. Click **Create** and select  Product
4. Fill in required fields:
   - Product Name
   - Slug (auto-generated)
   - Upload product images
   - Set price and discount
   - Select product type, sizes, colors, material
5. Add care instructions and occasion
6. Link to category and brand
7. Set stock quantity
8. Click **Publish**

### Creating a Category

1. Click **Categories** in the sidebar
2. Click **Create** and select Category
3. Fill in title, description, upload image
4. Select available sizes, colors, materials, occasions
5. Set display order and featured status
6. Click **Publish**

### Managing Orders

1. Click **Orders** in sidebar
2. View order details with products, addresses, and status
3. Update order status as it progresses

---

##  Authentication

- **Clerk**: Handles sign-up, sign-in, user management
- **Middleware**: middleware.ts protects routes
- Components: SignIn, UserButton, SignedIn, SignedOut

##  Payment Integration

- **Stripe**: Process payments
- Orders created after successful payment
- Payment intent ID stored in order

---

##  Deployment

`ash
npm install -g vercel
vercel
`

Add .env.local variables to Vercel project settings.

---

##  Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

##  Troubleshooting

### Clerk Middleware Error
- Ensure middleware.ts exists
- Clear .next folder and restart
- Check environment variables

### Sanity Connection Issues
- Verify project ID and dataset
- Check API token permissions

---

**Last Updated:** February 2026