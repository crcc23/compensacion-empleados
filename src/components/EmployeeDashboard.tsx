
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Upload, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { employeeProgress, performanceIndicators, calculateCompensation } from '@/data/mockData';
import ProgressCard from './ProgressCard';
import CompensationSummary from './CompensationSummary';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const userProgress = employeeProgress.filter(p => p.userId === user.id);
  const compensationData = calculateCompensation(user.id);

  const getProgressStats = () => {
    const completed = userProgress.filter(p => p.currentValue >= 
      performanceIndicators.find(i => i.id === p.indicatorId)?.maxValue!).length;
    const validated = userProgress.filter(p => p.validated).length;
    const withEvidence = userProgress.filter(p => p.evidenceUploaded).length;
    
    return { completed, validated, withEvidence, total: performanceIndicators.length };
  };

  const stats = getProgressStats();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-[#56aaba]/10 to-[#6a3687]/10 border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#56aaba]/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#56aaba]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">¡Hola, {user.name}!</h1>
              <p className="text-slate-600">{user.position} • {user.department}</p>
              {user.region && (
                <p className="text-sm text-slate-500">Región {user.region}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-xs text-slate-600">Completados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#56aaba]">{stats.validated}</div>
                <div className="text-xs text-slate-600">Validados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#6a3687]">{stats.withEvidence}</div>
                <div className="text-xs text-slate-600">Con Evidencia</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                <div className="text-xs text-slate-600">Total</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Mis Indicadores</h2>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Subir Evidencia
              </Button>
            </div>
            
            <div className="grid gap-4">
              {performanceIndicators.map((indicator) => {
                const progress = userProgress.find(p => p.indicatorId === indicator.id);
                if (!progress) return null;
                
                return (
                  <ProgressCard
                    key={indicator.id}
                    indicator={indicator}
                    progress={progress}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Compensation Summary */}
        <div className="space-y-6">
          <CompensationSummary compensationData={compensationData} />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-800">
                <Calendar className="w-5 h-5 text-[#56aaba]" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Cargar Evidencia
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Histórico
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Programar Revisión
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
