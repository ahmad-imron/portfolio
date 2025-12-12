import React, { useState } from 'react';
import { Lock, Eye, EyeOff, User } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Username dan password akan dicek melalui fungsi validasi yang lebih aman
  const validateCredentials = (inputUsername, inputPassword) => {
    try {
      console.log('Starting credential validation');
      console.log('Input username:', inputUsername);
      console.log('Input password length:', inputPassword ? inputPassword.length : 0);
      
      // Hardcoded credentials for testing
      const adminUsername = 'admin';
      const adminPassword = 'admin123';
      console.log('Expected username:', adminUsername);
      console.log('Expected password:', adminPassword);
      
      const isValid = inputUsername === adminUsername && inputPassword === adminPassword;
      console.log('Credential validation result:', isValid);
      
      return isValid;
    } catch (error) {
      console.error('Credential validation error:', error);
      throw new Error('Gagal memvalidasi kredensial: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setIsLoading(true);
    setError('');

    // Simulasi pengecekan kredensial
    setTimeout(() => {
      try {
        console.log('Validating credentials...');
        const isValid = validateCredentials(username, password);
        console.log('Credentials valid:', isValid);
        
        if (isValid) {
          console.log('Login successful, calling onLoginSuccess');
          // Tambahkan pengecekan apakah onLoginSuccess adalah fungsi
          if (typeof onLoginSuccess === 'function') {
            console.log('onLoginSuccess is a function, calling it');
            onLoginSuccess();
          } else {
            console.error('onLoginSuccess is not a function:', typeof onLoginSuccess);
            setError('Terjadi kesalahan konfigurasi. Silakan hubungi administrator.');
          }
        } else {
          console.log('Login failed, setting error');
          setError('Username atau password salah. Silakan coba lagi.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Terjadi kesalahan saat memvalidasi kredensial: ' + err.message);
      } finally {
        console.log('Setting isLoading to false');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-emerald-500/20 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto bg-emerald-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Lock className="text-emerald-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-slate-400">Masukkan username dan password untuk mengakses panel admin</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-slate-400" size={20} />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memverifikasi...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Hanya pemilik website yang boleh mengakses halaman ini</p>
          </div>
        </div>
      </div>
    </div>
  );
}