# Sales CRM – Clean, Simple & Professional Customer Management Platform

A complete, clean, modern, and lightweight **frontend-only Sales CRM web application** built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and **Recharts**.

Designed as a realistic demonstration of SaaS Sales CRM software with **zero external backend server, database, or third-party API dependencies**.

---

## 🌟 Key Features

1. **Dashboard**:
   - Executive KPI cards: Total Leads, Active Deals, Won Deals, Sales Revenue Value.
   - Interactive Sales Revenue Trend area chart using Recharts.
   - Sales Pipeline stage breakdown summary.
   - Recent Activities feed & scheduled Follow-Up reminders with instant completion toggles.

2. **Leads Module**:
   - Track and manage sales prospects (`New`, `Contacted`, `Qualified`, `Unqualified`, `Converted`).
   - Add, edit, search, filter, and view detailed lead overviews.
   - **One-Click Lead Conversion**: Convert qualified leads directly into active Customers and Contacts with automatic data propagation.

3. **Contacts Module**:
   - Central directory of decision makers, titles, email addresses, and phone numbers.
   - Full search, filter, and CRUD interactions.

4. **Customers Module**:
   - Overview of customer accounts categorized by type (`Enterprise`, `SMB`, `Individual`).
   - Detailed Account Modal displaying linked active deals, activity history, address, and account notes.

5. **Deals Pipeline**:
   - **Interactive 6-Stage Kanban Board** (`New`, `Qualified`, `Proposal`, `Negotiation`, `Won`, `Lost`).
   - Drag or click stage transitions with automatic probability calculation.
   - Total monetary value calculation header for each pipeline column.
   - View switcher between Kanban Board and Data Table.

6. **Activities Module**:
   - Schedule and track Calls, Meetings, Tasks, Follow-ups, and Emails.
   - Filter by activity type and status (`Upcoming`, `Completed`, `Overdue`).
   - Instant completion checkbox toggle.

7. **Quotations Module**:
   - Create, edit, and manage formal price proposals (`Draft`, `Sent`, `Accepted`, `Rejected`).
   - Dynamic line items editor with automated Subtotal, Discount %, Tax (8%), and Total Amount calculations.
   - **Printable Invoice Preview Modal** with browser print & PDF export support.

8. **Campaigns Module**:
   - Marketing campaign management board (`Draft`, `Active`, `Completed`).
   - Target group segmentation, budget utilization tracking, and lead generation metrics.

9. **Analytics Module**:
   - Visual charts powered by Recharts:
     - Sales & Deal Performance (Revenue trend & Win/Loss distribution)
     - Lead Conversion Funnel
     - Customer Account Type Distribution

10. **Settings & Customization**:
    - User Profile management (Name, Email, Role).
    - **Light & Dark Theme Toggle** with persistent state across all pages.
    - Default currency symbol (`$`, `€`, `£`) & pipeline stage preferences.
    - **"Reset Mock Data"** action button to restore initial sample dataset anytime.

11. **Demo Authentication & Notifications**:
    - Pre-configured demo login screen (`admin@demo.com` / `admin123`).
    - Top header notification panel with unread badge indicators and mark-as-read controls.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & PostCSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Persistence**: Browser `localStorage`

---

## 📁 Project Structure

```text
sales-crm/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts               # TypeScript data models
    ├── data/
    │   └── mockData.ts            # Pre-populated realistic sample dataset
    ├── context/
    │   ├── AuthContext.tsx        # Demo authentication state
    │   ├── CRMContext.tsx         # Central CRM data store & LocalStorage sync
    │   └── ThemeContext.tsx        # Dark/Light mode theme provider
    ├── utils/
    │   ├── storage.ts             # Safe LocalStorage wrapper
    │   └── formatters.ts          # Currency, date, and badge styling helpers
    ├── components/
    │   ├── common/                # Modal, ConfirmModal, Badge, EmptyState, SearchFilterBar
    │   ├── forms/                 # LeadForm, ContactForm, CustomerForm, DealForm, etc.
    │   └── layout/                # Sidebar, Header, AppLayout, NotificationModal
    └── pages/
        ├── Auth/                  # Login screen
        ├── Dashboard/             # Executive KPI & Sales overview
        ├── Leads/                 # Leads list & detail modal
        ├── Contacts/              # Contact directory
        ├── Customers/             # Customer accounts & detail drawer
        ├── Deals/                 # Kanban pipeline & table view
        ├── Activities/            # Activity schedule & follow-ups
        ├── Quotations/            # Proposal generator & print modal
        ├── Campaigns/             # Marketing campaigns
        ├── Analytics/             # Recharts analytics
        └── Settings/              # Profile, Theme & Data Reset
```

---

## 🚀 How to Run Locally

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd "sales crm"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` (or the URL output in your terminal).

5. **Sign in with Demo Credentials**:
   - **Email**: `admin@demo.com`
   - **Password**: `admin123`

---

## 🔒 No Database / No API Notice

> [!NOTE]
> This application is intentionally **100% frontend-only**:
> - It does **NOT** connect to MongoDB, MySQL, Firebase, Supabase, or any cloud database.
> - It does **NOT** make requests to external backend APIs or require API keys.
> - It does **NOT** send real email, SMS, or WhatsApp messages (all interactions are represented as mock CRM records).
> - All additions, updates, stage movements, and deletions persist locally in your browser's `localStorage`.

---

## 📄 License

MIT License. Designed and crafted for clean, professional Sales CRM demonstrations.
