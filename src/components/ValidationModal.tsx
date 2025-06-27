
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  XCircle, 
  User, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { User as UserType } from '@/types';
import { employeeProgress, performanceIndicators } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ValidationModalProps {
  employee: UserType | null;
  isOpen: boolean;
  onClose: () => void;
  onValidationComplete: () => void;
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  employee,
  isOpen,
  onClose,
  onValidationComplete
}) => {
  const [comments, setComments] = useState('');
  const [validationDecisions, setValidationDecisions] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  if (!employee) return null;

  const userProgress = employeeProgress.filter(p => p.userId === employee.id);
  const pendingValidation = userProgress.filter(p => !p.validated);

  const handleValidationDecision = (indicatorId: string, approved: boolean) => {
    setValidationDecisions(prev => ({
      ...prev,
      [indicatorId]: approved
    }));
  };

  const handleSubmitValidation = () => {
    const approvedCount = Object.values(validationDecisions).filter(Boolean).length;
    const rejectedCount = Object.values(validationDecisions).filter(decision => decision === false).length;
    
    toast({
      title: "Validación completada",
      description: `${approvedCount} indicadores aprobados, ${rejectedCount} rechazados.`,
    });

    onValidationComplete();
    onClose();
    setComments('');
    setValidationDecisions({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-800">
            Validar Indicadores
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Info */}
          <Card className="bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#56aaba]/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#56aaba]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{employee.name}</h3>
                  <p className="text-sm text-slate-600">{employee.position} • {employee.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-800">{pendingValidation.length}</div>
                <div className="text-xs text-slate-600">Pendientes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-800">
                  {Object.values(validationDecisions).filter(Boolean).length}
                </div>
                <div className="text-xs text-slate-600">Por Aprobar</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-800">
                  {Object.values(validationDecisions).filter(decision => decision === false).length}
                </div>
                <div className="text-xs text-slate-600">Por Rechazar</div>
              </CardContent>
            </Card>
          </div>

          {/* Indicators for Validation */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores Pendientes de Validación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingValidation.map((progress) => {
                  const indicator = performanceIndicators.find(i => i.id === progress.indicatorId);
                  if (!indicator) return null;

                  const progressPercentage = Math.min((progress.currentValue / indicator.maxValue) * 100, 100);
                  const decision = validationDecisions[progress.indicatorId];

                  return (
                    <div key={progress.indicatorId} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-800">{indicator.name}</h4>
                          <p className="text-sm text-slate-600 mb-2">{indicator.description}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-600">Progreso:</span>
                            <span className="font-medium">{progress.currentValue} / {indicator.maxValue}</span>
                            {progress.evidenceUploaded && (
                              <Badge variant="outline" className="text-xs">
                                <FileText className="w-3 h-3 mr-1" />
                                Evidencia
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={decision === true ? "default" : "outline"}
                            className={decision === true ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleValidationDecision(progress.indicatorId, true)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button
                            size="sm"
                            variant={decision === false ? "destructive" : "outline"}
                            onClick={() => handleValidationDecision(progress.indicatorId, false)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      </div>

                      <Progress 
                        value={progressPercentage} 
                        className="h-2"
                      />
                      
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>{Math.round(progressPercentage)}% completado</span>
                        <span>Peso: {indicator.weight}%</span>
                      </div>
                    </div>
                  );
                })}

                {pendingValidation.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                    <p>Todos los indicadores están validados</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          {pendingValidation.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Comentarios de Validación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="comments">Comentarios (opcional)</Label>
                  <Textarea
                    id="comments"
                    placeholder="Agrega comentarios sobre la validación..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitValidation}
            disabled={pendingValidation.length > 0 && Object.keys(validationDecisions).length === 0}
            className="bg-[#56aaba] hover:bg-[#4a96a3]"
          >
            Confirmar Validación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationModal;
