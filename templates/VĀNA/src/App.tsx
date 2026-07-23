import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Classes from "./components/Classes";
import Instructors from "./components/Instructors";
import Schedule from "./components/Schedule";
import Memberships from "./components/Memberships";
import Retreats from "./components/Retreats";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

interface BookingState {
  category: string;
  className: string;
  instructor: string;
  timeSlot?: string;
  day?: string;
}

export default function App() {
  const [bookingState, setBookingState] = useState<BookingState>({
    category: "yoga",
    className: "",
    instructor: "Maya Rivers",
  });

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectBooking = (booking: BookingState) => {
    setBookingState(booking);
    // Smooth scroll to the booking section
    setTimeout(() => {
      handleNavigate("booking");
    }, 100);
  };

  const handleClearBookingState = () => {
    setBookingState({
      category: "yoga",
      className: "",
      instructor: "Maya Rivers",
    });
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-sage/40 selection:text-charcoal antialiased">
      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Hero Section */}
      <Hero onNavigate={handleNavigate} />

      {/* Philosophy Section */}
      <Philosophy />

      {/* Classes Section */}
      <Classes onSelectBooking={handleSelectBooking} />

      {/* Instructors Section */}
      <Instructors />

      {/* Weekly Schedule Section */}
      <Schedule onSelectBooking={handleSelectBooking} />

      {/* Memberships Section */}
      <Memberships />

      {/* Retreats Section */}
      <Retreats />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Gallery Section */}
      <Gallery />

      {/* FAQ Section */}
      <FAQ />

      {/* Booking Section */}
      <Booking
        bookingState={bookingState}
        onClearBookingState={handleClearBookingState}
      />

      {/* Contact & Map Section */}
      <Contact />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
