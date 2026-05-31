"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInPage, { Testimonial } from '@/components/ui/sign-in';

const sampleTestimonials: Testimonial[] = [];

const SignUpPageRoute = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.error || 'Unable to create account');
        }
        router.push('/');
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
