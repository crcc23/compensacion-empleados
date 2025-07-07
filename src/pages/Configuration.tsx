import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Weight, 
  Users, 
  Shield, 
  Database,
  Bell,
  Mail,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WeightConfigurationView from '@/components/WeightConfigurationView';
import Header from '@/components/Header';

const Configuration = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (activeSection === 'weights') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <WeightConfigurationView onClose={() => setActiveSection(null)} />
        </div>
      </div>
    );
  }

  const configSections = [
    {
      id: 'weights',
      title: 'Configuración de Pesos',
      description: 'Gestiona los pesos e indicadores de desempeño',
      icon: Weight,
      color: 'bg-blue-100 text-blue-700',
      available: true
    },
    {
      id: 'users',
      title: 'Gestión de Usuarios',
      description: 'Administra roles y permisos de usuarios',
      icon: Users,
      color: 'bg-green-100 text-green-700',
      available: false
    },
    {
      id: 'security',
      title: 'Seguridad y Acceso',
      description: 'Configura políticas de seguridad',
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
      available: false
    },
    {
      id: 'database',
      title: 'Base de Datos',
      description: 'Configuración y respaldos de datos',
      icon: Database,
      color: 'bg-orange-100 text-orange-700',
      available: false
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      description: 'Configura alertas y notificaciones',
      icon: Bell,
      color: 'bg-yellow-100 text-yellow-700',
      available: false
    },
    {
      id: 'email',
      title: 'Configuración de Email',
      description: 'Plantillas y configuración SMTP',
      icon: Mail,
      color: 'bg-red-100 text-red-700',
      available: false
    },
    {
      id: 'general',
      title: 'Configuración General',
      description: 'Ajustes generales de la aplicación',
      icon: Globe,
      color: 'bg-indigo-100 text-indigo-700',
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-slate-800">Configuración del Sistema</h1>
          </div>
          <p className="text-slate-600">
            Panel de administración para configurar todos los aspectos del sistema
          </p>
        </div>

        {/* System Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-green-600" />
              Estado del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Activo</div>
                <p className="text-sm text-slate-600">Base de Datos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <p className="text-sm text-slate-600">Disponibilidad</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <p className="text-sm text-slate-600">Usuarios Activos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">v1.0.0</div>
                <p className="text-sm text-slate-600">Versión</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configSections.map((section) => (
            <Card 
              key={section.id}
              className={`border border-slate-200 hover:border-primary/30 transition-all duration-200 ${
                section.available ? 'cursor-pointer hover:shadow-lg' : 'opacity-60'
              }`}
              onClick={() => section.available && setActiveSection(section.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${section.color}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-800">{section.title}</h3>
                      {!section.available && (
                        <Badge variant="outline" className="text-xs">
                          Próximamente
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {section.description}
                    </p>
                    <Button 
                      variant={section.available ? "default" : "outline"} 
                      size="sm"
                      disabled={!section.available}
                      className={section.available ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      {section.available ? 'Configurar' : 'Próximamente'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Respaldar Configuración
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reiniciar Caché
              </Button>
              <Button variant="outline" size="sm">
                <Database className="w-4 h-4 mr-2" />
                Verificar Base de Datos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;