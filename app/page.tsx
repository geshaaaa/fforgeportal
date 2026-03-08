'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Lock, ArrowRight, LogIn, UserPlus } from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'onboard'>('login');
  const router = useRouter();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('onboardingCompleted') === 'true';
      if (completed) {
        router.replace('/dashboard');
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    // For now, redirect to dashboard if onboarding is completed
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('onboardingCompleted') === 'true';
      if (completed) {
        router.push('/dashboard');
      } else {
        // Show message that they need to onboard first
        alert('Please complete onboarding first');
      }
    }
  };

  const handleStartOnboarding = () => {
    router.push('/onboarding');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-black mb-3">Start with FeedForge</h1>
          <p className="text-gray-600 text-lg">
            Your data feeding and management portal
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b-2 border-gray-100">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-center font-semibold transition-all duration-200 relative ${
                activeTab === 'login'
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
              {activeTab === 'login' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform transition-all duration-200" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('onboard')}
              className={`flex-1 py-3 text-center font-semibold transition-all duration-200 relative ${
                activeTab === 'onboard'
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Onboard
              {activeTab === 'onboard' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform transition-all duration-200" />
              )}
            </button>
          </div>

          {/* Login Tab */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-black hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </button>
            </form>
          )}

          {/* Onboard Tab */}
          {activeTab === 'onboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-[#FBF9F7] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
                  <UserPlus className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Get Started</h3>
                <p className="text-gray-600">
                  Create your organization and set up your account in just a few steps.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-[#FBF9F7] rounded-lg border-2 border-gray-200 hover:border-black transition-all duration-200">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-black">Create Organization</p>
                    <p className="text-sm text-gray-600">Set up your workspace</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#FBF9F7] rounded-lg border-2 border-gray-200 hover:border-black transition-all duration-200">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-black">Create Account</p>
                    <p className="text-sm text-gray-600">Set up your admin account</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#FBF9F7] rounded-lg border-2 border-gray-200 hover:border-black transition-all duration-200">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-black">Add Team</p>
                    <p className="text-sm text-gray-600">Invite team members (optional)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#FBF9F7] rounded-lg border-2 border-gray-200 hover:border-black transition-all duration-200">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <p className="font-semibold text-black">Configure Channels</p>
                    <p className="text-sm text-gray-600">Select import & export methods</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartOnboarding}
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Start Onboarding
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">
            Have a client code?{' '}
            <a href="#" className="text-black hover:underline font-medium">Join your team</a>
          </span>
        </div>
      </div>
    </div>
  );
}
