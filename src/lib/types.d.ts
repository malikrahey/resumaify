
type Experience = {
  id: string,
  company?: string,
  title?: string,
  location?: string,
  start_date?: string,
  end_date?: string,
  description?: string,
};

type Project = {
  id: number,
  title?: string,
  description?: string,
  url?: string,
};

type PersonalInfo = {
  id: string;
  user_id: string
  name: string;
  phone: string;
  location: string;
  email: string;
  links: string[];
}

type Education = {
  id: string,
  school?: string,
  degree?: string,
  start_date?: string,
  end_date?: string,
  description?: string,
}

type FormDateLabel = "startDate" | "endDate";
