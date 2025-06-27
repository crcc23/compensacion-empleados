
import { PerformanceIndicator, EmployeeProgress, CompensationData } from '@/types';

export const performanceIndicators: PerformanceIndicator[] = [
  {
    id: '1',
    name: 'Formación Técnica y Continua',
    weight: 25,
    maxValue: 12,
    description: 'Cursos de capacitación interna y externa completados durante el período',
    category: 'courses'
  },
  {
    id: '2',
    name: 'Gestión de Incidencias y Resolución de Casos',
    weight: 30,
    maxValue: 50,
    description: 'Casos o tickets resueltos satisfactoriamente en los sistemas internos',
    category: 'tickets'
  },
  {
    id: '3',
    name: 'Certificaciones Profesionales Reconocidas',
    weight: 20,
    maxValue: 3,
    description: 'Certificaciones o títulos acreditados obtenidos durante el período evaluado',
    category: 'certifications'
  },
  {
    id: '4',
    name: 'Contribución en Proyectos Institucionales',
    weight: 15,
    maxValue: 8,
    description: 'Participación activa en comités, actividades, eventos o iniciativas internas',
    category: 'activities'
  },
  {
    id: '5',
    name: 'Resultados de Evaluación Anual de Desempeño',
    weight: 10,
    maxValue: 100,
    description: 'Puntuación obtenida en la evaluación formal del desempeño individual',
    category: 'evaluation'
  }
];

export const employeeProgress: EmployeeProgress[] = [
  // Usuario 1 - Juan Pérez
  { userId: '1', indicatorId: '1', currentValue: 8, evidenceUploaded: true, lastUpdated: new Date('2024-06-15'), validated: true },
  { userId: '1', indicatorId: '2', currentValue: 35, evidenceUploaded: true, lastUpdated: new Date('2024-06-20'), validated: true },
  { userId: '1', indicatorId: '3', currentValue: 2, evidenceUploaded: false, lastUpdated: new Date('2024-06-10'), validated: false },
  { userId: '1', indicatorId: '4', currentValue: 6, evidenceUploaded: true, lastUpdated: new Date('2024-06-18'), validated: true },
  { userId: '1', indicatorId: '5', currentValue: 85, evidenceUploaded: false, lastUpdated: new Date('2024-06-01'), validated: true },

  // Usuario 3 - Carlos López
  { userId: '3', indicatorId: '1', currentValue: 10, evidenceUploaded: true, lastUpdated: new Date('2024-06-22'), validated: true },
  { userId: '3', indicatorId: '2', currentValue: 42, evidenceUploaded: true, lastUpdated: new Date('2024-06-25'), validated: true },
  { userId: '3', indicatorId: '3', currentValue: 1, evidenceUploaded: true, lastUpdated: new Date('2024-06-12'), validated: false },
  { userId: '3', indicatorId: '4', currentValue: 7, evidenceUploaded: false, lastUpdated: new Date('2024-06-20'), validated: true },
  { userId: '3', indicatorId: '5', currentValue: 92, evidenceUploaded: false, lastUpdated: new Date('2024-06-05'), validated: true }
];

export function calculateCompensation(userId: string): CompensationData {
  const userProgress = employeeProgress.filter(p => p.userId === userId);
  let totalPercentage = 0;
  const breakdown = [];

  for (const indicator of performanceIndicators) {
    const progress = userProgress.find(p => p.indicatorId === indicator.id);
    if (progress) {
      const achievementRate = Math.min(progress.currentValue / indicator.maxValue, 1);
      const weightedPercentage = achievementRate * indicator.weight;
      totalPercentage += weightedPercentage;
      
      breakdown.push({
        indicatorId: indicator.id,
        percentage: weightedPercentage,
        achieved: progress.currentValue,
        target: indicator.maxValue
      });
    }
  }

  return {
    userId,
    totalPercentage: Math.round(totalPercentage),
    breakdown
  };
}
