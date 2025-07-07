import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Building, 
  Award, 
  MapPin, 
  ArrowLeft,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleSave = () => {
    // In a real app, you would make an API call to update the user
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-800">Mi Perfil</h1>
        </div>

        <div className="grid gap-6">
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-[#56aaba]/5 to-[#6a3687]/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#56aaba]/20 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-[#56aaba]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                    <p className="text-slate-600">{user.position}</p>
                    <Badge variant="outline" className="mt-1">
                      {user.role === 'admin' ? 'Administrador' : 'Empleado'}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#56aaba]" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedUser?.name || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-slate-50 rounded-md">{user.name}</div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedUser?.email || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-slate-50 rounded-md flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {user.email}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#56aaba]" />
                Información Laboral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  {isEditing ? (
                    <Input
                      id="department"
                      value={editedUser?.department || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, department: e.target.value} : null)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-slate-50 rounded-md flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-500" />
                      {user.department}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="position">Posición</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={editedUser?.position || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, position: e.target.value} : null)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-slate-50 rounded-md flex items-center gap-2">
                      <Award className="w-4 h-4 text-slate-500" />
                      {user.position}
                    </div>
                  )}
                </div>
              </div>
              
              {user.region && (
                <div>
                  <Label htmlFor="region">Región</Label>
                  {isEditing ? (
                    <Input
                      id="region"
                      value={editedUser?.region || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, region: e.target.value} : null)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-slate-50 rounded-md flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      Región {user.region}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save/Cancel buttons when editing */}
          {isEditing && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-[#56aaba] hover:bg-[#56aaba]/90">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;