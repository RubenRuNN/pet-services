/**
 * Shared Type Definitions
 * Common types used across the application
 */

import type {
  UserRole,
  AppointmentStatus,
  ServiceType,
  TaskStatus,
  NotificationChannel,
  SubscriptionPlan,
  SubscriptionStatus,
} from '@/config/constants';

// User Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  tenantId: string;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  businessName: string;
  businessEmail: string;
  businessPhone: string | null;
  businessAddress: string | null;
  timezone: string;
  locale: string;
  branding: {
    logo: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
  };
  notifications: {
    defaultChannel: NotificationChannel;
    emailEnabled: boolean;
    smsEnabled: boolean;
    whatsappEnabled: boolean;
  };
}

// Customer Types
export interface Customer {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: Address | null;
  communicationPreferences: CommunicationPreferences;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CommunicationPreferences {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  preferredChannel: NotificationChannel;
}

// Pet Types
export interface Pet {
  id: string;
  tenantId: string;
  customerId: string;
  name: string;
  species: string;
  breed: string | null;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  dateOfBirth: Date | null;
  weight: number | null;
  chipId: string | null;
  photo: string | null;
  vaccinationStatus: VaccinationStatus;
  allergies: string[];
  medicalNotes: string | null;
  behaviorNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VaccinationStatus {
  rabies: { vaccinated: boolean; expirationDate: Date | null };
  dhpp: { vaccinated: boolean; expirationDate: Date | null };
  bordatella: { vaccinated: boolean; expirationDate: Date | null };
  other: Array<{ name: string; vaccinated: boolean; expirationDate: Date | null }>;
}

// Appointment Types
export interface Appointment {
  id: string;
  tenantId: string;
  customerId: string;
  petId: string;
  serviceId: string;
  staffId: string | null;
  scheduledAt: Date;
  duration: number; // minutes
  status: AppointmentStatus;
  notes: string | null;
  cancellationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Service Types
export interface Service {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  type: ServiceType;
  duration: number; // minutes
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Staff Types
export interface Staff {
  id: string;
  tenantId: string;
  userId: string;
  role: string;
  skills: string[];
  maxCapacity: number;
  availability: StaffAvailability;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffAvailability {
  monday: TimeSlot | null;
  tuesday: TimeSlot | null;
  wednesday: TimeSlot | null;
  thursday: TimeSlot | null;
  friday: TimeSlot | null;
  saturday: TimeSlot | null;
  sunday: TimeSlot | null;
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string; // HH:mm format
  closed: boolean;
}

// Task Types
export interface Task {
  id: string;
  tenantId: string;
  appointmentId: string;
  templateId: string | null;
  name: string;
  description: string | null;
  status: TaskStatus;
  completedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskTemplate {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  serviceType: ServiceType;
  checklist: TaskChecklistItem[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskChecklistItem {
  id: string;
  label: string;
  required: boolean;
  order: number;
}

// Utility Types
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | null | undefined;
}

