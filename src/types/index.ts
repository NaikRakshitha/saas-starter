export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}