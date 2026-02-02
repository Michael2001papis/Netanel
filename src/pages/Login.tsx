import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  useDocumentTitle('התחברות');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        toast.success('התחברת בהצלחה!');
        // מעבר מיידי ל-Dashboard - ה-Navbar יתעדכן אוטומטית דרך AuthContext
        navigate('/admin/dashboard');
      } else {
        setError('שם משתמש או סיסמה שגויים');
        toast.error('שם משתמש או סיסמה שגויים');
      }
    } catch (err) {
      setError('אירעה שגיאה. נסה שוב.');
      toast.error('אירעה שגיאה. נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            התחברות
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="שם משתמש"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
            
            <Input
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              התחבר
            </Button>
          </form>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}
