export interface Event {
  id: string;
  slug: string;
  title: string;
  summary: string;
  cover: string;
  description: string;
  schedule: string;
  importantInfo: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    maps: string;
  };
  startDate: string;
  endDate: string;
  startsAt: string;
  endsAt: string;
  displayStartsAt: string;
  displayEndsAt: string;
  registrationUrl: string;
  registrationStarts: string;
  registrationEnds: string;
  registrationStartsAt: string;
  registrationEndsAt: string;
  status: string;
  featured: boolean;
  fixed: boolean;
  label?: string;
}
