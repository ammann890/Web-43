import { ShipmentDetails } from '../types';

export const VALID_TRACKING_ID = 'GE-849204812US';

export const DEFAULT_SHIPMENT: ShipmentDetails = {
  trackingId: VALID_TRACKING_ID,
  serviceType: 'Global Express Freight Direct - Heavy Cargo Spec',
  status: 'In Transit',
  dispatchedDate: 'September 18, 2026 - 06:30 AM',
  estimatedDelivery: 'Calculating...',
  origin: {
    city: 'Birmingham',
    state: 'Alabama',
    hubName: 'Alabama Regional Logistics Distribution Facility',
    country: 'United States',
  },
  destination: {
    name: 'Charles Andrew Bright',
    street: '7475 E CR 600 south',
    city: 'Greencastle',
    state: 'Indiana',
    zip: '46135',
    address: '7475 E CR 600 south, Greencastle Indiana 46135',
    age: '62 yrs old',
    dob: 'October 23rd 1963',
  },
  dimensions: {
    length: '~21 ft (251 in / 6.37 m)',
    width: '~6.8 ft (82 in / 2.08 m)',
    height: '~6.7 ft (80 in / 2.03 m)',
    weight: '~7,000 lb (3,175 kg)',
  },
};

export function getShipmentDetails(): ShipmentDetails {
  return DEFAULT_SHIPMENT;
}
