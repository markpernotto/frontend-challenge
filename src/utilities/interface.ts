// Alphabetical interfaces

export interface AllCountries {
  data: FullCountry[];
  links: Links;
  meta: Meta;
}

export interface Country {
  data: {
    name: string;
    full_name: string;
    capital: string;
    iso2: string;
    iso3: string;
    covid19: {
      total_case: string;
      total_deaths: string;
      last_updated: string;
    };
    current_president: {
      name: string;
      gender: string;
      appointment_start_date: string;
      appointment_end_date: string | null;
      href: {
        self: string;
        country: string;
        picture: string;
      } | null;
    };
    currency: string;
    phone_code: string;
    continent: string;
    description: string;
    size: string;
    independence_date: string;
    population: string;
    href: {
      self: string;
      states: string;
      presidents: string;
      flag: string;
    };
  };
}

export interface CurrentPresident {
  appointment_end_date: string;
  appointment_start_date: string;
  gender: string;
  href: {
    country: string;
    picture: string;
    self: string;
  };
  name: string;
}

export interface FlagsProps {
  flags: FullCountry[] | undefined;
}

export interface FullCountry {
  capital: string;
  continent: string;
  covid19: {
    last_updated: string;
    total_case: number;
    total_deaths: number;
  };
  currency: string;
  current_president: CurrentPresident | null;
  description: string;
  full_name: string;
  href: {
    flag: string;
    presidents: string;
    self: string;
    states: string;
  };
  independence_date: string | null;
  iso2: string;
  iso3: string;
  name: string;
  phone_code: string;
  population: string;
  size: string;
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface SlimCountry {
  currency: string;
  href: {
    self: string;
    flag: string;
  };
  iso2: string;
  iso3: string;
  name: string;
  phone_code: string;
}
