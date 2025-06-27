
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Upload } from 'lucide-react';
import { PerformanceIndicator, EmployeeProgress } from '@/types';

interface ProgressCardProps {
  indicator: PerformanceIndicator;
  progress: EmployeeProgress;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ indicator, progress }) => {
  const progressPercentage = Math.min((progress.currentValue / indicator.maxValue) * 100, 100);
  const isCompleted = progress.currentValue >= indicator.maxValue;
  
  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (progress.evidenceUploaded) return <Upload className="w-4 h-4 text-[#56aaba]" />;
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  const getStatusBadge = () => {
    if (isCompleted) return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
    if (progress.validated) return <Badge className="bg-[#56aaba]/10 text-[#56aaba]">Validado</Badge>;
    return <Badge variant="outline" className="text-yellow-700 border-yellow-300">Pendiente</Badge>;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-lg text-slate-800">{indicator.name}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-slate-600 mt-1">{indicator.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Progreso</span>
            <span className="font-medium text-slate-800">
              {progress.currentValue} / {indicator.maxValue}
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2"
            style={{
              '--progress-foreground': isCompleted ? '#059669' : '#56aaba'
            } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{Math.round(progressPercentage)}% completado</span>
            <span>Peso: {indicator.weight}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Actualizado: {progress.lastUpdated.toLocaleDateString()}
          </div>
          {progress.evidenceUploaded && (
            <Badge variant="outline" className="text-xs">
              Evidencia cargada
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
