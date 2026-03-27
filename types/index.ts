export type Lead = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  rating: number;
  userRatingCount: number;
  types: string[];
  primaryType: string;
  phoneNumbers?: string[];
  websiteUri?: string;
  instagramUri?: string;
  facebookUri?: string;
  regularOpeningHours?: any;
  photos?: any[];
  reviews?: any[];
  businessStatus?: string;
  googleMapsUri?: string;
  selected?: boolean;
};

export type SearchParams = {
  icp: string;
  service?: string;
  state: string;
  city: string;
};
