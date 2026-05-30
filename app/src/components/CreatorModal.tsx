import { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight } from 'lucide-react';
import { creatorConfig } from '../config';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatorModal = ({ isOpen, onClose }: CreatorModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo: Accept any credentials and show success message
    setIsLoading(false);
    setMessage(
      mode === 'login'
        ? 'Welcome back, Creator! This is a demo - in production, this would authenticate with your backend.'
        : 'Welcome to the Creator community! This is a demo - in production, this would create your account.'
    );

    // Clear form after success
    setTimeout(() => {
      setEmail('');
      setPassword('');
      setName('');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-carbon/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-ink hairline-border overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-chalk/50 hover:text-chalk transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-10 pb-6">
          <div className="w-12 h-12 bg-forest/20 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-forest" />
          </div>
          <h2 className="font-display text-2xl font-bold text-chalk mb-2">
            {creatorConfig.modalTitle}
          </h2>
          <p className="text-muted-telax text-sm leading-relaxed">
            {creatorConfig.modalDescription}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="px-8 mb-6">
          <div className="flex gap-1 p-1 bg-carbon rounded-lg">
            <button
              onClick={() => {
                setMode('login');
                setMessage('');
              }}
              className={`flex-1 py-2 px-4 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 rounded ${
                mode === 'login'
                  ? 'bg-forest text-carbon font-semibold'
                  : 'text-chalk/60 hover:text-chalk'
              }`}
            >
              {creatorConfig.loginButtonText}
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setMessage('');
              }}
              className={`flex-1 py-2 px-4 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 rounded ${
                mode === 'signup'
                  ? 'bg-forest text-carbon font-semibold'
                  : 'text-chalk/60 hover:text-chalk'
              }`}
            >
              {creatorConfig.signupButtonText}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-telax" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-11 pr-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-telax" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-telax">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-telax" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-carbon border border-chalk/10 text-chalk placeholder:text-muted-telax/50 focus:border-forest focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {message && (
            <div className="p-4 bg-forest/10 border border-forest/30 rounded">
              <p className="text-sm text-forest">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-forest text-carbon font-mono text-sm uppercase tracking-[0.12em] font-semibold hover:bg-forest-light transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-carbon/30 border-t-carbon rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? creatorConfig.loginButtonText : creatorConfig.signupButtonText}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-telax">
            {mode === 'login'
              ? "Don't have an account? Switch to 'Become a Creator'"
              : 'Already a creator? Switch to Sign In'}
          </p>
        </form>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-forest/20" />
        <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-forest/20" />
      </div>
    </div>
  );
};

export default CreatorModal;
