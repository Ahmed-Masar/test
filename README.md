# Vodex OS

A modern login interface for Vodex OS, built with Next.js and Tailwind CSS.

## Features

- Dark theme login screen
- Email and password authentication
- Password visibility toggle
- Remember me functionality
- Responsive design
- Modern UI/UX

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the login screen.

## Project Structure

```
Vodex/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   └── Login.tsx        # Login component
├── package.json
└── README.md
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Default Credentials

- Email: `admin@vodex.tech`
- Password: `Code2020`

## Build for Production

```bash
npm run build
npm start
```

