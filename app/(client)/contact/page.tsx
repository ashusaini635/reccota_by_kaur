"use client";

import React, { useState } from "react";
import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Form data extraction
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset(); // Clear the form
      } else {
        const resData = await response.json();
        setError(resData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to send message. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-linear-to-b from-soft-pink/10 to-white min-h-screen">
      <Container>
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <Title className="text-4xl md:text-5xl font-bold tracking-wide text-darkColor">
            Get in <span className="text-accent-pink font-serif italic font-medium">Touch</span>
          </Title>
          <div className="w-20 h-1 bg-accent-pink/80 rounded-full mx-auto" />
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
            Have a question about our collections, customized orders, or just want to say hello? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-accent-pink/10">
              <h3 className="text-2xl font-bold text-darkColor mb-6 tracking-wide">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-soft-pink/30 flex items-center justify-center text-accent-pink">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkColor text-sm uppercase tracking-widest mb-1">Our Studio</h4>
                    <p className="text-gray-600 leading-relaxed">123 Fashion Street, Boutique Block<br />New Delhi, India 110001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-soft-pink/30 flex items-center justify-center text-accent-pink">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkColor text-sm uppercase tracking-widest mb-1">Phone</h4>
                    <p className="text-gray-600 leading-relaxed">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-soft-pink/30 flex items-center justify-center text-accent-pink">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkColor text-sm uppercase tracking-widest mb-1">Email</h4>
                    <p className="text-gray-600 leading-relaxed">reecota_by_kaur@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg shadow-accent-pink/5 border border-accent-pink/20">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-10">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-darkColor">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We will get back to you as soon as possible.</p>
                <Button onClick={() => setIsSuccess(false)} className="mt-4 bg-darkColor text-white hover:bg-dark-pink rounded-full">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-medium text-center">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="name" placeholder="Your Name" required className="bg-soft-pink/10 border-accent-pink/20 focus-visible:ring-accent-pink/50 rounded-xl px-4 py-3" />
                  <Input name="email" type="email" placeholder="Your Email" required className="bg-soft-pink/10 border-accent-pink/20 focus-visible:ring-accent-pink/50 rounded-xl px-4 py-3" />
                </div>
                <Input name="subject" placeholder="Subject" required className="bg-soft-pink/10 border-accent-pink/20 focus-visible:ring-accent-pink/50 rounded-xl px-4 py-3" />
                <textarea name="message" placeholder="Your Message" required rows={5} className="w-full bg-soft-pink/10 border border-accent-pink/20 focus-visible:ring-1 focus-visible:ring-accent-pink/50 focus-visible:outline-none rounded-xl px-4 py-3 text-sm resize-none"></textarea>
                <Button disabled={isSubmitting} className="w-full bg-dark-pink text-white hover:bg-accent-pink hoverEffect rounded-xl py-6 text-base font-semibold shadow-md hover:shadow-xl transition-all duration-300">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
