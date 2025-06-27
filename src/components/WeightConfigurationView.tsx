
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  AlertTriangle,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { performanceIndicators } from '@/data/mockData';
import { PerformanceIndicator } from '@/types';

interface WeightConfigurationViewProps {
  onClose: () => void;
}

const WeightConfigurationView: React.FC<WeightConfigurationViewProps> = ({ onClose }) => {
  const [indicators, setIndicators] = useState<PerformanceIndicator[]>(performanceIndicators);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PerformanceIndicator>>({});
  const [newIndicator, setNewIndicator] = useState<Partial<PerformanceIndicator>>({
    name: '',
    weight: 0,
    maxValue: 0,
    description: '',
    category: 'courses'
  });

  const categories = [
    { value: 'courses', label: 'Cursos' },
    { value: 'tickets', label: 'Tickets/Problemas' },
    { value: 'certifications', label: 'Certificaciones' },
    { value: 'activities', label: 'Actividades' },
    { value: 'evaluation', label: 'Evaluación' }
  ];

  const totalWeight = indicators.reduce((sum, indicator) => sum + indicator.weight, 0);

  const handleEditStart = (indicator: PerformanceIndicator) => {
    setIsEditing(indicator.id);
    setEditForm(indicator);
  };

  const handleEditSave = () => {
    if (isEditing && editForm) {
      setIndicators(prev => 
        prev.map(indicator => 
          indicator.id === isEditing 
            ? { ...indicator, ...editForm } as PerformanceIndicator
            : indicator
        )
      );
      setIsEditing(null);
      setEditForm({});
    }
  };

  const handleEditCancel = () => {
    setIsEditing(null);
    setEditForm({});
  };

  const handleAddIndicator = () => {
    if (newIndicator.name && newIndicator.weight && newIndicator.maxValue) {
      const indicator: PerformanceIndicator = {
        id: Date.now().toString(),
        name: newIndicator.name,
        weight: newIndicator.weight,
        maxValue: newIndicator.maxValue,
        description: newIndicator.description || '',
        category: newIndicator.category || 'courses'
      };
      
      setIndicators(prev => [...prev, indicator]);
      setNewIndicator({
        name: '',
        weight: 0,
        maxValue: 0,
        description: '',
        category: 'courses'
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteIndicator = (id: string) => {
    setIndicators(prev => prev.filter(indicator => indicator.id !== id));
    setShowDeleteModal(null);
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      courses: 'bg-blue-100 text-blue-800',
      tickets: 'bg-green-100 text-green-800',
      certifications: 'bg-purple-100 text-purple-800',
      activities: 'bg-orange-100 text-orange-800',
      evaluation: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onClose}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-[#56aaba]" />
                <CardTitle className="text-xl text-slate-800">Configuración de Pesos</CardTitle>
              </div>
            </div>
            <Button 
              className="bg-[#56aaba] hover:bg-[#4a96a3]"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Indicador
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Weight Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Peso Total</h3>
              <p className="text-sm text-slate-600">Suma de todos los pesos configurados</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalWeight}%
              </div>
              {totalWeight !== 100 && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  Debe sumar 100%
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicators List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Indicadores de Desempeño</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {indicators.map((indicator) => (
              <Card key={indicator.id} className="border border-slate-200">
                <CardContent className="p-4">
                  {isEditing === indicator.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nombre del Indicador</Label>
                          <Input
                            id="name"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Categoría</Label>
                          <Select 
                            value={editForm.category} 
                            onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="weight">Peso (%)</Label>
                          <Input
                            id="weight"
                            type="number"
                            min="0"
                            max="100"
                            value={editForm.weight || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, weight: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxValue">Valor Máximo</Label>
                          <Input
                            id="maxValue"
                            type="number"
                            min="1"
                            value={editForm.maxValue || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, maxValue: Number(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Descripción</Label>
                        <Input
                          id="description"
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Descripción del indicador..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleEditSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleEditCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-800">{indicator.name}</h3>
                          <Badge className={getCategoryColor(indicator.category)}>
                            {getCategoryLabel(indicator.category)}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{indicator.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-700">Peso:</span>
                            <span className="ml-1 text-[#56aaba] font-semibold">{indicator.weight}%</span>
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Valor Máximo:</span>
                            <span className="ml-1">{indicator.maxValue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditStart(indicator)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowDeleteModal(indicator.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Indicator Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Indicador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Nombre del Indicador</Label>
                <Input
                  id="new-name"
                  value={newIndicator.name || ''}
                  onChange={(e) => setNewIndicator(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Cursos Completados"
                />
              </div>
              <div>
                <Label htmlFor="new-category">Categoría</Label>
                <Select 
                  value={newIndicator.category} 
                  onValueChange={(value) => setNewIndicator(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new-weight">Peso (%)</Label>
                <Input
                  id="new-weight"
                  type="number"
                  min="0"
                  max="100"
                  value={newIndicator.weight || ''}
                  onChange={(e) => setNewIndicator(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="new-maxValue">Valor Máximo</Label>
                <Input
                  id="new-maxValue"
                  type="number"
                  min="1"
                  value={newIndicator.maxValue || ''}
                  onChange={(e) => setNewIndicator(prev => ({ ...prev, maxValue: Number(e.target.value) }))}
                  placeholder="10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-description">Descripción</Label>
              <Input
                id="new-description"
                value={newIndicator.description || ''}
                onChange={(e) => setNewIndicator(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción del indicador..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-[#56aaba] hover:bg-[#4a96a3]"
              onClick={handleAddIndicator}
            >
              Agregar Indicador
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!showDeleteModal} onOpenChange={() => setShowDeleteModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <p className="text-slate-600">
            ¿Estás seguro de que deseas eliminar este indicador? Esta acción no se puede deshacer.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={() => showDeleteModal && handleDeleteIndicator(showDeleteModal)}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeightConfigurationView;
