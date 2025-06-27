
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Award } from 'lucide-react';
import { CompensationData } from '@/types';
import { performanceIndicators } from '@/data/mockData';

interface CompensationSummaryProps {
  compensationData: CompensationData;
}

const CompensationSummary: React.FC<CompensationSummaryProps> = ({ compensationData }) => {
  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excelente', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (percentage >= 75) return { level: 'Muy Bueno', color: 'text-[#56aaba]', bgColor: 'bg-[#56aaba]/5' };
    if (percentage >= 60) return { level: 'Bueno', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { level: 'Mejorable', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const performance = getPerformanceLevel(compensationData.totalPercentage);

  return (
    <div className="space-y-6">
      {/* Resumen Principal */}
      <Card className="border-2 border-[#56aaba]/20 bg-gradient-to-br from-[#56aaba]/5 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
            <Award className="w-6 h-6 text-[#56aaba]" />
            Compensación Variable Alcanzada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-5xl font-bold text-[#56aaba]">
              {compensationData.totalPercentage}%
            </div>
            <div className={`inline-flex px-4 py-2 rounded-full ${performance.bgColor}`}>
              <span className={`font-medium ${performance.color}`}>
                {performance.level}
              </span>
            </div>
            <Progress 
              value={compensationData.totalPercentage} 
              className="h-3"
              style={{ '--progress-foreground': '#56aaba' } as React.CSSProperties}
            />
          </div>
        </CardContent>
      </Card>

      {/* Desglose de Indicadores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-slate-800">
            <TrendingUp className="w-5 h-5 text-[#6a3687]" />
            Desglose por Indicador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {compensationData.breakdown.map((item) => {
              const indicator = performanceIndicators.find(i => i.id === item.indicatorId);
              if (!indicator) return null;

              const achievementRate = (item.achieved / item.target) * 100;

              return (
                <div key={item.indicatorId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">{indicator.name}</span>
                    <div className="text-right">
                      <div className="font-semibold text-[#56aaba]">
                        {Math.round(item.percentage)}%
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.achieved}/{item.target}
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={achievementRate} 
                    className="h-2"
                    style={{ '--progress-foreground': '#6a3687' } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Peso: {indicator.weight}%</span>
                    <span>{Math.round(achievementRate)}% logrado</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Objetivos */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-slate-800">
            <Target className="w-5 h-5 text-[#6a3687]" />
            Próximos Objetivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-slate-600">
            <p>• Completar certificaciones pendientes para aumentar 20% adicional</p>
            <p>• Mantener el nivel actual de resolución de problemas</p>
            <p>• Participar en 2 actividades internas más este trimestre</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompensationSummary;
