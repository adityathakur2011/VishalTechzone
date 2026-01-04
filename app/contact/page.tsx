"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const to = "business@vishaltechzone.com";
    const subject = encodeURIComponent(`Contact from VishalTechZone: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We'd love to hear from you. Use the form below to send us a message or email directly at <a href="mailto:business@vishaltechzone.com" className="text-orange-600">business@vishaltechzone.com</a>.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl">
            <label className="block mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </label>

            <div className="flex items-center gap-3">
              <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium">Send Message</button>
              <a href="mailto:business@vishaltechzone.com" className="text-sm text-gray-600 dark:text-gray-300">Or email directly</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
