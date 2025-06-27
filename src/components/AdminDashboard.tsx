import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Settings, 
  Download,
  Search,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { employeeProgress, performanceIndicators, calculateCompensation } from '@/data/mockData';
import EmployeeDetailsSection from './EmployeeDetailsSection';
import ValidationModal from './ValidationModal';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetailsSection, setShowDetailsSection] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Mock employee data
  const employees = [
    { id: '1', name: 'Juan Pérez', department: 'Operaciones', position: 'Analista Senior', region: 'Norte' },
    { id: '3', name: 'Carlos López', department: 'Comercial', position: 'Ejecutivo de Cuenta', region: 'Sur' }
  ];

  const getEmployeeStats = () => {
    const stats = employees.map(emp => {
      const compensation = calculateCompensation(emp.id);
      const userProgress = employeeProgress.filter(p => p.userId === emp.id);
      const validatedCount = userProgress.filter(p => p.validated).length;
      const totalIndicators = performanceIndicators.length;
      
      return {
        ...emp,
        compensation: compensation.totalPercentage,
        validated: validatedCount,
        total: totalIndicators,
        validationRate: (validatedCount / totalIndicators) * 100
      };
    });

    return stats;
  };

  const employeeStats = getEmployeeStats();
  const averageCompensation = Math.round(
    employeeStats.reduce((sum, emp) => sum + emp.compensation, 0) / employeeStats.length
  );

  const handleViewDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setShowDetailsSection(true);
  };

  const handleValidate = (employee: any) => {
    setSelectedEmployee(employee);
    setShowValidationModal(true);
  };

  const handleValidationComplete = () => {
    // Refresh data after validation
    console.log('Validation completed, refreshing data...');
  };

  const handleCloseDetails = () => {
    setShowDetailsSection(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-[#56aaba]" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{employees.length}</p>
                <p className="text-sm text-slate-600">Empleados Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#6a3687]" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{averageCompensation}%</p>
                <p className="text-sm text-slate-600">Compensación Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {employeeStats.filter(e => e.validationRate === 100).length}
                </p>
                <p className="text-sm text-slate-600">Totalmente Validados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {employeeStats.filter(e => e.validationRate < 100).length}
                </p>
                <p className="text-sm text-slate-600">Pendientes Validación</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl text-slate-800">Gestión de Empleados</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurar Pesos
              </Button>
              <Button className="bg-[#56aaba] hover:bg-[#4a96a3]" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar Reporte
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar empleado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Employee List */}
          <div className="space-y-4">
            {employeeStats.map((employee) => (
              <Card key={employee.id} className="border border-slate-200 hover:border-[#56aaba]/30 transition-colors">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-slate-800">{employee.name}</h3>
                      <p className="text-sm text-slate-600">{employee.position}</p>
                      <p className="text-xs text-slate-500">{employee.department} • {employee.region}</p>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#56aaba]">
                        {employee.compensation}%
                      </div>
                      <p className="text-xs text-slate-500">Compensación</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Validación</span>
                        <span>{employee.validated}/{employee.total}</span>
                      </div>
                      <Progress 
                        value={employee.validationRate} 
                        className="h-2"
                        style={{ '--progress-foreground': '#6a3687' } as React.CSSProperties}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      {employee.validationRate === 100 ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pendiente
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(employee)}
                      >
                        Ver Detalles
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-[#6a3687] hover:bg-[#5a2f73]"
                        onClick={() => handleValidate(employee)}
                      >
                        Validar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Details Section - Traditional view */}
      {showDetailsSection && (
        <EmployeeDetailsSection
          employee={selectedEmployee}
          onClose={handleCloseDetails}
        />
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Distribución por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Operaciones</span>
                <Badge className="bg-[#56aaba]/10 text-[#56aaba]">1 empleado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Comercial</span>
                <Badge className="bg-[#6a3687]/10 text-[#6a3687]">1 empleado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Configuración de Pesos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {performanceIndicators.map((indicator) => (
                <div key={indicator.id} className="flex justify-between">
                  <span className="text-slate-600">{indicator.name}</span>
                  <span className="font-medium text-slate-800">{indicator.weight}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Modal - Keep as modal */}
      <ValidationModal
        employee={selectedEmployee}
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onValidationComplete={handleValidationComplete}
      />
    </div>
  );
};

export default AdminDashboard;
