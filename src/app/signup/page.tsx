"use client";
import React, { useState } from 'react';
import SignInPage, { Testimonial } from '@/components/ui/sign-in';

const sampleTestimonials: Testimonial[] = [];

const SignUpPageRoute = () => {
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goHome = () => {
    setIsTransitioning(true);
    window.setTimeout(() => {
      window.location.assign('/');
    }, 280);
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.error || 'Unable to create account');
        }
        goHome();
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    alert('Google sign up is not connected yet');
  };

  return (
    <div className="dark bg-background min-h-screen text-foreground">
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] blur-3xl" />
        <div className={`absolute inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-md transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-black/30 px-6 py-5 text-sm text-white shadow-2xl">
            <div className="h-10 w-10 animate-pulse rounded-full border border-white/20 border-t-white" />
            <span>Opening Oni…</span>
          </div>
        </div>
        {error && <div className="absolute top-20 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-sm text-white">{error}</div>}

        <SignInPage
          mode="signup"
          heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
          testimonials={sampleTestimonials}
          onSignIn={handleSignUp}
          onGoogleSignIn={handleGoogleSignIn}
        />
      </div>
    </div>
  );
};

export default SignUpPageRoute;
