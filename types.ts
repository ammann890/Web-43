export interface RecipientInfo {
  name: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  age: string;
  dob: string;
}

export interface PackageDimensions {
  length: string;
  width: string;
  height: string;
  weight: string;
}

export interface ShipmentDetails {
  trackingId: string;
  serviceType: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Pending';
  origin: {
    city: string;
    state: string;
    hubName: string;
    country: string;
  };
  destination: RecipientInfo;
  dimensions: PackageDimensions;
  dispatchedDate: string;
  estimatedDelivery: string;
}

