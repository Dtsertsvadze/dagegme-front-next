export type LocalizedText = {
  en: string;
  ka: string;
};

export type Provider = {
  id: number;
  name?: LocalizedText | string | null;
  description?: LocalizedText | string | null;
  profile_photo_url?: string | null;
  sort_order: number | null;
  vip?: boolean;
  vip_order?: number | null;
};

export type Listing = {
  id: string;
  categoryId: string;
  categoryName: LocalizedText;
  title: LocalizedText | string;
  description: LocalizedText | string;
  imageUrl: string;
  href: string;
  links: string[];
  photos: string[];
  vip: boolean;
  sortOrder: number | null;
  detailsHref?: string;
  vipOrder?: number | null;
};
