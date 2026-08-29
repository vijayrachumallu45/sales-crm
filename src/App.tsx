import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CRMProvider } from './context/CRMContext';
import { AppLayout } from './components/layout/AppLayout';
import { NavItem } from './components/layout/Sidebar';

// Pages
import { Login } from './pages/Auth/Login';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { LeadsPage } from './pages/Leads/LeadsPage';
import { ContactsPage } from './pages/Contacts/ContactsPage';
import { CustomersPage } from './pages/Customers/CustomersPage';
import { DealsPage } from './pages/Deals/DealsPage';
import { ActivitiesPage } from './pages/Activities/ActivitiesPage';
import { QuotationsPage } from './pages/Quotations/QuotationsPage';
import { CampaignsPage } from './pages/Campaigns/CampaignsPage';
import { AnalyticsPage } from './pages/Analytics/AnalyticsPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

const MainContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<NavItem>('Dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Leads':
        return <LeadsPage />;
      case 'Contacts':
        return <ContactsPage />;
      case 'Customers':
        return <CustomersPage />;
      case 'Deals':
        return <DealsPage />;
      case 'Activities':
        return <ActivitiesPage />;
      case 'Quotations':
        return <QuotationsPage />;
      case 'Campaigns':
        return <CampaignsPage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveView()}
    </AppLayout>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CRMProvider>
          <MainContent />
        </CRMProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
