import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Lead,
  Contact,
  Customer,
  Deal,
  Activity,
  Quotation,
  Campaign,
  Notification,
  DealStage,
  QuotationStatus,
  ActivityStatus,
} from '../types';
import {
  initialLeads,
  initialContacts,
  initialCustomers,
  initialDeals,
  initialActivities,
  initialQuotations,
  initialCampaigns,
  initialNotifications,
} from '../data/mockData';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

interface CRMPreferences {
  defaultCurrency: string;
  defaultPipelineStage: DealStage;
}

interface CRMContextType {
  // Data arrays
  leads: Lead[];
  contacts: Contact[];
  customers: Customer[];
  deals: Deal[];
  activities: Activity[];
  quotations: Quotation[];
  campaigns: Campaign[];
  notifications: Notification[];
  preferences: CRMPreferences;

  // Search query
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Lead CRUD
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  convertLeadToCustomer: (leadId: string) => void;

  // Contact CRUD
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;

  // Customer CRUD
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalDealsValue'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Deal CRUD
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt'>) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  updateDealStage: (dealId: string, stage: DealStage) => void;

  // Activity CRUD
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  toggleActivityStatus: (id: string) => void;

  // Quotation CRUD
  addQuotation: (quotation: Omit<Quotation, 'id' | 'quoteNumber'>) => void;
  updateQuotation: (id: string, quotation: Partial<Quotation>) => void;
  deleteQuotation: (id: string) => void;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;

  // Campaign CRUD
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Preferences
  updatePreferences: (prefs: Partial<CRMPreferences>) => void;

  // Reset
  resetAllData: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const [leads, setLeads] = useState<Lead[]>(() =>
    loadFromStorage('crm_leads', initialLeads)
  );
  const [contacts, setContacts] = useState<Contact[]>(() =>
    loadFromStorage('crm_contacts', initialContacts)
  );
  const [customers, setCustomers] = useState<Customer[]>(() =>
    loadFromStorage('crm_customers', initialCustomers)
  );
  const [deals, setDeals] = useState<Deal[]>(() =>
    loadFromStorage('crm_deals', initialDeals)
  );
  const [activities, setActivities] = useState<Activity[]>(() =>
    loadFromStorage('crm_activities', initialActivities)
  );
  const [quotations, setQuotations] = useState<Quotation[]>(() =>
    loadFromStorage('crm_quotations', initialQuotations)
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>(() =>
    loadFromStorage('crm_campaigns', initialCampaigns)
  );
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    loadFromStorage('crm_notifications', initialNotifications)
  );
  const [preferences, setPreferences] = useState<CRMPreferences>(() =>
    loadFromStorage('crm_preferences', {
      defaultCurrency: '$',
      defaultPipelineStage: 'New',
    })
  );

  // Sync to storage
  useEffect(() => saveToStorage('crm_leads', leads), [leads]);
  useEffect(() => saveToStorage('crm_contacts', contacts), [contacts]);
  useEffect(() => saveToStorage('crm_customers', customers), [customers]);
  useEffect(() => saveToStorage('crm_deals', deals), [deals]);
  useEffect(() => saveToStorage('crm_activities', activities), [activities]);
  useEffect(() => saveToStorage('crm_quotations', quotations), [quotations]);
  useEffect(() => saveToStorage('crm_campaigns', campaigns), [campaigns]);
  useEffect(() => saveToStorage('crm_notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('crm_preferences', preferences), [preferences]);

  // Handlers
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads((prev) => [newLead, ...prev]);

    // Push notification
    addSystemNotification('New Lead Created', `Lead ${newLead.name} from ${newLead.company} was added.`, 'info');
  };

  const updateLead = (id: string, updatedData: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((item) => item.id !== id));
  };

  const convertLeadToCustomer = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    // 1. Update lead status to Converted
    updateLead(leadId, { status: 'Converted' });

    // 2. Add to Contacts if not already there
    const newContact: Contact = {
      id: `cnt-${Date.now()}`,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      designation: 'Decision Maker',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setContacts((prev) => [newContact, ...prev]);

    // 3. Add to Customers if not already there
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      customerType: 'SMB',
      status: 'Active',
      totalDealsValue: lead.estimatedValue || 0,
      notes: `Converted from Lead on ${new Date().toISOString().split('T')[0]}. Notes: ${lead.notes || 'None'}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);

    addSystemNotification('Lead Converted!', `${lead.name} (${lead.company}) was converted to a Customer & Contact.`, 'success');
  };

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const updateContact = (id: string, updatedData: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((item) => item.id !== id));
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalDealsValue'>) => {
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      totalDealsValue: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const updateCustomer = (id: string, updatedData: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  };

  const addDeal = (dealData: Omit<Deal, 'id' | 'createdAt'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDeals((prev) => [newDeal, ...prev]);
    addSystemNotification('New Deal Created', `Deal "${newDeal.name}" ($${newDeal.amount.toLocaleString()}) added to ${newDeal.stage} stage.`, 'deal');
  };

  const updateDeal = (id: string, updatedData: Partial<Deal>) => {
    setDeals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteDeal = (id: string) => {
    setDeals((prev) => prev.filter((item) => item.id !== id));
  };

  const updateDealStage = (dealId: string, stage: DealStage) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const probability =
            stage === 'Won' ? 100 : stage === 'Lost' ? 0 : stage === 'Negotiation' ? 90 : stage === 'Proposal' ? 75 : stage === 'Qualified' ? 50 : 25;
          return { ...d, stage, probability };
        }
        return d;
      })
    );
  };

  const addActivity = (actData: Omit<Activity, 'id'>) => {
    const newAct: Activity = {
      ...actData,
      id: `act-${Date.now()}`,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const updateActivity = (id: string, updatedData: Partial<Activity>) => {
    setActivities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleActivityStatus = (id: string) => {
    setActivities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus: ActivityStatus = item.status === 'Completed' ? 'Upcoming' : 'Completed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const addQuotation = (qData: Omit<Quotation, 'id' | 'quoteNumber'>) => {
    const num = quotations.length + 1;
    const newQuote: Quotation = {
      ...qData,
      id: `quote-${Date.now()}`,
      quoteNumber: `QT-2026-${String(num).padStart(3, '0')}`,
    };
    setQuotations((prev) => [newQuote, ...prev]);
    addSystemNotification('New Quotation Created', `Quotation ${newQuote.quoteNumber} created for ${newQuote.companyName}.`, 'info');
  };

  const updateQuotation = (id: string, updatedData: Partial<Quotation>) => {
    setQuotations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteQuotation = (id: string) => {
    setQuotations((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuotationStatus = (id: string, status: QuotationStatus) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const addCampaign = (cData: Omit<Campaign, 'id'>) => {
    const newCamp: Campaign = {
      ...cData,
      id: `camp-${Date.now()}`,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const updateCampaign = (id: string, updatedData: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((item) => item.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addSystemNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'deal') => {
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      date: 'Just now',
      read: false,
      type,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updatePreferences = (prefs: Partial<CRMPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const resetAllData = () => {
    setLeads(initialLeads);
    setContacts(initialContacts);
    setCustomers(initialCustomers);
    setDeals(initialDeals);
    setActivities(initialActivities);
    setQuotations(initialQuotations);
    setCampaigns(initialCampaigns);
    setNotifications(initialNotifications);
    setPreferences({ defaultCurrency: '$', defaultPipelineStage: 'New' });

    removeFromStorage('crm_leads');
    removeFromStorage('crm_contacts');
    removeFromStorage('crm_customers');
    removeFromStorage('crm_deals');
    removeFromStorage('crm_activities');
    removeFromStorage('crm_quotations');
    removeFromStorage('crm_campaigns');
    removeFromStorage('crm_notifications');
    removeFromStorage('crm_preferences');

    addSystemNotification('Data Reset', 'All CRM mock data has been restored to default sample values.', 'info');
  };

  return (
    <CRMContext.Provider
      value={{
        leads,
        contacts,
        customers,
        deals,
        activities,
        quotations,
        campaigns,
        notifications,
        preferences,
        globalSearchQuery,
        setGlobalSearchQuery,

        addLead,
        updateLead,
        deleteLead,
        convertLeadToCustomer,

        addContact,
        updateContact,
        deleteContact,

        addCustomer,
        updateCustomer,
        deleteCustomer,

        addDeal,
        updateDeal,
        deleteDeal,
        updateDealStage,

        addActivity,
        updateActivity,
        deleteActivity,
        toggleActivityStatus,

        addQuotation,
        updateQuotation,
        deleteQuotation,
        updateQuotationStatus,

        addCampaign,
        updateCampaign,
        deleteCampaign,

        markNotificationRead,
        clearAllNotifications,

        updatePreferences,
        resetAllData,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
