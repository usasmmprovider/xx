import { ServiceItem } from '../types/index.ts';
import { REVIEWS_SERVICES } from './reviewsServices.ts';
import { BANK_SERVICES } from './bankServices.ts';
import { EMAIL_SERVICES } from './emailServices.ts';
import { VOIP_SERVICES } from './voipServices.ts';
import { SOCIAL_SERVICES } from './socialServices.ts';
import { DEVELOPER_SERVICES } from './developerServices.ts';

export const ALL_SERVICES: ServiceItem[] = [
  ...REVIEWS_SERVICES,
  ...BANK_SERVICES,
  ...EMAIL_SERVICES,
  ...VOIP_SERVICES,
  ...SOCIAL_SERVICES,
  ...DEVELOPER_SERVICES,
];

export function getServiceById(id: string): ServiceItem | undefined {
  return ALL_SERVICES.find((s) => s.id === id || s.slug === id);
}

export function getRelatedServices(service: ServiceItem): ServiceItem[] {
  if (!service.relatedServiceIds || service.relatedServiceIds.length === 0) {
    return ALL_SERVICES.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 4);
  }
  const related = service.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter((s): s is ServiceItem => Boolean(s));
  
  if (related.length < 4) {
    const additional = ALL_SERVICES.filter(
      (s) => s.id !== service.id && !related.some((r) => r.id === s.id)
    ).slice(0, 4 - related.length);
    return [...related, ...additional];
  }
  return related;
}
