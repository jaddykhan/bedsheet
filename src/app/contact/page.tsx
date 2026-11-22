"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { PhoneCall, Mail, MapPin, MessageSquare, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast("Thank you! Your message has been received. Our team will reach out via WhatsApp/email.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-4xl space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29]">
              Contact Loom & Living
            </h1>
            <p className="text-sm text-[#6B7267] max-w-md mx-auto">
              Have questions about bed sizes, custom bridal bundles, or delivery status? We&apos;re here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Contact Details */}
            <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#292D29]">Customer Helpdesk</h2>

              <div className="space-y-4 text-xs text-[#292D29]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] shrink-0">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="font-bold block">WhatsApp Support:</span>
                    <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="text-[#2F4325] hover:underline font-semibold">
                      +92 (300) 123-4567
                    </a>
                    <span className="text-[10px] text-[#6B7267] block">Fastest response within 10-15 mins</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block">Email Inquiries:</span>
                    <span>support@loomandliving.pk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block">Support Hours:</span>
                    <span>Monday to Saturday, 9:00 AM – 9:00 PM PKT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block">Fulfillment Center:</span>
                    <span>Industrial Area, Faisalabad, Punjab, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-[#292D29]">Send an Inquiry</h2>

                <div>
                  <label className="text-xs font-semibold text-[#292D29] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bilal Hassan"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#292D29] block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="bilal@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#292D29] block mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="03001234567"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#292D29] block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you with our bedsheets or orders?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2F4325] text-white text-xs font-bold hover:bg-[#24351c] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
