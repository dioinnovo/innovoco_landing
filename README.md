# Innovoco AI & Automation Platform

A comprehensive Next.js application for managing Innovoco's AI automation business line, featuring an admin dashboard for tracking projects, opportunities, and business growth.

## 🚀 Features Implemented

### ✅ Core Infrastructure
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with dark theme configuration
- **shadcn/ui** component library integration
- Responsive design with mobile-first approach

### ✅ Dashboard System
- **Sidebar Navigation**: Collapsible sidebar with mobile support
- **Dashboard Home**: KPI cards, activity feed, and quick actions
- **Route Structure**: Organized with public and protected routes

### ✅ Landing Page
- **Hero Section**: Animated hero with company metrics
- **Use Cases**: Enterprise data AI solutions showcase
- **CTA Sections**: Clear call-to-action buttons
- **Footer**: Company information and certifications

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx       # Landing page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   │   └── page.tsx       # Dashboard home
│   │   ├── globals.css        # Global styles and theme
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/
│   │   │   ├── kpi-card.tsx
│   │   │   └── activity-feed.tsx
│   │   └── landing/
│   │       ├── hero-section.tsx
│   │       ├── use-case-card.tsx
│   │       └── data-use-cases.tsx
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── components.json            # shadcn/ui configuration
└── package.json

```

## 🛠️ Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

4. **Start Production Server**
```bash
npm start
```

## 🎨 Theme Configuration

The application uses a dark theme by default with custom colors:

- **Primary**: `#1a1a2e` - Dark background
- **Secondary**: `#16213e` - Section backgrounds
- **Accent**: `#0f3460` - Accent elements
- **Highlight**: `#e94560` - Emphasis color
- **Gradients**: Purple/blue gradients for headings

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page with hero, use cases, and CTAs

### Dashboard Routes
- `/dashboard` - Main dashboard with KPIs and activity feed
- `/dashboard/marketing` - Marketing hub (planned)
- `/dashboard/ai-stack` - Technology stack comparison (planned)
- `/dashboard/use-cases` - Solution catalog (planned)
- `/dashboard/pipeline` - CRM and opportunity tracking (planned)
- `/dashboard/projects` - Project management (planned)
- `/dashboard/business-model` - Strategic planning (planned)
- `/dashboard/analytics` - Performance metrics (planned)

## 🚧 Remaining Tasks

### High Priority
- [ ] Implement AI Stack page with technology comparisons
- [ ] Create Use Cases page with data and functional tabs
- [ ] Build Pipeline page with Kanban board
- [ ] Develop Projects page with project management

### Medium Priority
- [ ] Create Business Model strategic planning page
- [ ] Implement Marketing hub page
- [ ] Add Analytics dashboard with charts
- [ ] Setup Zustand for state management

### Low Priority
- [ ] Add localStorage persistence
- [ ] Implement search and filter functionality
- [ ] Add loading states and error handling
- [ ] Final testing and polish

## 💻 Development Commands

```bash
# Install a new shadcn/ui component
npx shadcn@latest add <component-name>

# Check TypeScript errors
npm run type-check

# Format code (if prettier is installed)
npm run format
```

## 🔗 Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Lucide React**: Beautiful icon library

## 📈 Business Value

This platform serves as a comprehensive tool for:
- Tracking AI automation opportunities and projects
- Managing client relationships and pipelines
- Showcasing AI capabilities to potential clients
- Measuring business performance and growth
- Strategic planning for the automation practice

## 🤝 Contributing

When adding new features:
1. Follow the existing component patterns
2. Maintain the dark theme consistency
3. Ensure mobile responsiveness
4. Update this README with new features

## 📝 License

© 2025 Innovoco. Enterprise AI Solutions for the Data-Driven Future.
