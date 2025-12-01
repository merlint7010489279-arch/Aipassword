import { useState } from 'react';
import { Shield, Check, X, AlertCircle } from 'lucide-react';
import { analyzePassword } from './utils/passwordAnalyzer';

function App() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzePassword> | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword) {
      setAnalysis(analyzePassword(newPassword));
    } else {
      setAnalysis(null);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'text-red-600';
      case 'fair': return 'text-orange-600';
      case 'good': return 'text-yellow-600';
      case 'strong': return 'text-green-600';
      case 'very strong': return 'text-emerald-600';
      default: return 'text-gray-600';
    }
  };

  const getStrengthBg = (strength: string) => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'fair': return 'bg-orange-500';
      case 'good': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      case 'very strong': return 'bg-emerald-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthWidth = (strength: string) => {
    switch (strength) {
      case 'weak': return 'w-1/5';
      case 'fair': return 'w-2/5';
      case 'good': return 'w-3/5';
      case 'strong': return 'w-4/5';
      case 'very strong': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Password Strength Checker
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Enter a password to check its strength
          </p>

          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
            />
          </div>

          {analysis && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">Strength:</span>
                  <span className={`text-sm font-bold uppercase ${getStrengthColor(analysis.strength)}`}>
                    {analysis.strength}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthBg(analysis.strength)} ${getStrengthWidth(analysis.strength)} transition-all duration-500 ease-out`}
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Requirements</h3>
                {analysis.checks.map((check, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {check.passed ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${check.passed ? 'text-slate-700' : 'text-slate-600'}`}>
                      {check.message}
                    </span>
                  </div>
                ))}
              </div>

              {analysis.suggestions.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <h3 className="text-sm font-semibold text-blue-900">Improvements</h3>
                  </div>
                  <ul className="space-y-2 ml-7">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-800">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
