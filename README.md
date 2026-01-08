# Elvin Manuel - Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience as a full-stack developer.

## Features

- Netflix-style animated loader with "ELVIN" branding
- Responsive design that works on all devices
- Skills showcase with progress indicators
- Project gallery with interactive cards
- Experience timeline
- Contact form with modal
- Social media integration

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Framer Motion (for animations)

## Skills

### Frontend
- React, Next JS (75%)
- TypeScript (75%)
- Tailwind CSS (90%)
- UI/UX (93%)
- Responsive Design (88%)

### Backend
- Node.js (88%)
- PostgreSQL (73%)
- REST APIs (90%)
- Docker (76%)
- PHP (94%)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

## Project Structure

```
portfolio-clone/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # Radix UI components
│   ├── contact-modal.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navigation.tsx
│   ├── netflix-loader.tsx
│   └── ...
├── lib/
│   └── utils.ts
├── public/           # Static assets
└── ...
```

## Customization

To customize the portfolio for your own use:

1. Update the metadata in `app/layout.tsx`
2. Modify the content in `app/page.tsx`
3. Update the navigation links in `components/navigation.tsx`
4. Add your own project images to the `public/` folder
5. Update the social media links in `components/footer.tsx`

## Deployment

The project is ready for deployment on platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

For Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Import the project with default settings
3. Deploy

## License

This project is open source and available under the MIT License.

## Contact

Elvin Manuel
- [LinkedIn](https://www.linkedin.com/in/elvin-manuel-181940147/)
- Portfolio: [elvinmanuel.com](#)