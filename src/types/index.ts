
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  department: string;
  position: string;
  region?: string;
}

export interface PerformanceIndicator {
  id: string;
  name: string;
  weight: number; // Peso porcentual del indicador
  maxValue: number;
  description: string;
  category: 'courses' | 'tickets' | 'certifications' | 'activities' | 'evaluation';
}

export interface EmployeeProgress {
  userId: string;
  indicatorId: string;
  currentValue: number;
  evidenceUploaded: boolean;
  lastUpdated: Date;
  validated: boolean;
}

export interface CompensationData {
  userId: string;
  totalPercentage: number;
  breakdown: {
    indicatorId: string;
    percentage: number;
    achieved: number;
    target: number;
  }[];
}
