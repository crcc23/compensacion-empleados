
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MapPin, 
  Building, 
  Award,
  CheckCircle,
  Clock,
  Upload,
  Calendar,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { employeeProgress, performanceIndicators, calculateCompensation } from '@/data/mockData';

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  // Mock employee data - in a real app, you'd fetch this by ID
  const employees = [
    { id: '1', name: 'Juan Pérez', department: 'Operaciones', position: 'Analista Senior', region: 'Norte', email: 'juan.perez@company.com' },
    { id: '3', name: 'Carlos López', department: 'Comercial', position: 'Ejecutivo de Cuenta', region: 'Sur', email: 'carlos.lopez@company.com' }
  ];

  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Empleado no encontrado</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const userProgress = employeeProgress.filter(p => p.userId === employee.id);
  const compensationData = calculateCompensation(employee.id);

  const getStatusIcon = (progress: any, indicator: any) => {
    const isCompleted = progress.currentValue >= indicator.maxValue;
    if (isCompleted) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (progress.evidenceUploaded) return <Upload className="w-4 h-4 text-[#56aaba]" />;
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  const getStatusBadge = (progress: any, indicator: any) => {
    const isCompleted = progress.currentValue >= indicator.maxValue;
    if (isCompleted) return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
    if (progress.validated) return <Badge className="bg-[#56aaba]/10 text-[#56aaba]">Validado</Badge>;
    return <Badge variant="outline" className="text-yellow-700 border-yellow-300">Pendiente</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-800">Detalles del Empleado</h1>
          </div>
        </div>

        {/* Employee Info */}
        <Card className="bg-gradient-to-r from-[#56aaba]/5 to-[#6a3687]/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#56aaba]/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-[#56aaba]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">{employee.name}</h2>
                <div className="flex items-center gap-4 text-slate-600 mt-2">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{employee.position}</span>
                  </div>
                  {employee.region && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Región {employee.region}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {employee.email}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#56aaba]">
                  {compensationData.totalPercentage}%
                </div>
                <div className="text-sm text-slate-600">Compensación</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-[#56aaba] mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {userProgress.filter(p => {
                  const indicator = performanceIndicators.find(i => i.id === p.indicatorId);
                  return indicator && p.currentValue >= indicator.maxValue;
                }).length}
              </div>
              <div className="text-xs text-slate-600">Completados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {userProgress.filter(p => p.validated).length}
              </div>
              <div className="text-xs text-slate-600">Validados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Upload className="w-8 h-8 text-[#6a3687] mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {userProgress.filter(p => p.evidenceUploaded).length}
              </div>
              <div className="text-xs text-slate-600">Con Evidencia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {performanceIndicators.length}
              </div>
              <div className="text-xs text-slate-600">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso Detallado por Indicador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceIndicators.map((indicator) => {
                const progress = userProgress.find(p => p.indicatorId === indicator.id);
                if (!progress) return null;

                const progressPercentage = Math.min((progress.currentValue / indicator.maxValue) * 100, 100);
                const isCompleted = progress.currentValue >= indicator.maxValue;

                return (
                  <div key={indicator.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(progress, indicator)}
                        <div>
                          <h4 className="font-semibold text-slate-800">{indicator.name}</h4>
                          <p className="text-sm text-slate-600">{indicator.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(progress, indicator)}
                    </div>

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

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <div className="text-xs text-slate-500">
                        Actualizado: {progress.lastUpdated.toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        {progress.evidenceUploaded && (
                          <Badge variant="outline" className="text-xs">
                            Evidencia cargada
                          </Badge>
                        )}
                        {!progress.validated && (
                          <Button size="sm" variant="outline">
                            Validar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetails;
