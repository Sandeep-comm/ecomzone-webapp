export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;  // ZIP code is often represented as a string to preserve leading zeros
  }