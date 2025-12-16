'use client';
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram, Check, Sparkles, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "sushantrm4367@gmail.com", link: "mailto:sushantrm4367@gmail.com", color: "from-blue-500 to-cyan-500" },
    { icon: Phone, label: "Phone", value: "+977 9746575954", link: "tel:+9779746575954", color: "from-emerald-500 to-teal-500" },
    { icon: MapPin, label: "Location", value: "Janakpur, Nepal", link: null, color: "from-purple-500 to-pink-500" }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", link: "#", hoverColor: "hover:border-slate-500 hover:text-slate-900 dark:hover:text-white" },
    { icon: Linkedin, label: "LinkedIn", link: "#", hoverColor: "hover:border-blue-500 hover:text-blue-600" },
    { icon: Twitter, label: "Twitter", link: "#", hoverColor: "hover:border-sky-500 hover:text-sky-500" },
    { icon: Instagram, label: "Instagram", link: "#", hoverColor: "hover:border-pink-500 hover:text-pink-500" }
  ];

  return (
    <section id="contact" className={`min-h-screen py-24 px-6 relative transition-colors duration-500 ${theme === 'dark'
      ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
      : 'bg-gradient-to-b from-white via-indigo-50 to-white'
      }`}>
      {/* Background */}
      <div className={`absolute inset-0 ${theme === 'dark'
        ? 'bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.02)_1px,transparent_1px)]'
        : 'bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)]'
        } bg-[size:60px_60px]`} />

      {/* Gradient orb */}
      <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-400/20'
        }`} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
            ? 'bg-pink-500/10 border border-pink-500/30 text-pink-400'
            : 'bg-pink-100 border border-pink-300 text-pink-700'
            }`}>
            <MessageSquare size={16} />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Let's Create </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Whether you have a project in mind, want to collaborate, or just want to say hi—I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Contact Information</h3>
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link || '#'}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 group ${theme === 'dark'
                    ? 'bg-slate-800/30 border border-slate-700/50 hover:border-slate-600'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg'
                    }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-white" size={22} />
                  </div>
                  <div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{info.label}</div>
                    <div className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${theme === 'dark'
                      ? 'bg-slate-800/50 border border-slate-700 text-slate-400'
                      : 'bg-white border border-slate-300 text-slate-500 shadow-md'
                      } ${social.hoverColor}`}
                    title={social.label}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                </span>
                <span className="font-bold text-lg text-emerald-500">Available for Work</span>
              </div>
              <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                I'm currently open to freelance projects, collaborations, and full-time opportunities.
                Let's discuss how I can help bring your ideas to life!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`rounded-2xl p-8 backdrop-blur-sm ${theme === 'dark'
            ? 'bg-slate-800/30 border border-slate-700/50'
            : 'bg-white border border-slate-200 shadow-xl'
            }`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <Sparkles size={20} className="text-purple-500" />
              Send a Message
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 animate-scaleIn">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-white" size={40} />
                </div>
                <h4 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h4>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'name@example.com' },
                  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {field.label} <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${theme === 'dark'
                        ? 'bg-slate-900/50 border text-white placeholder-slate-500'
                        : 'bg-slate-50 border text-slate-900 placeholder-slate-400'
                        } ${focusedField === field.name
                          ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                          : theme === 'dark' ? 'border-slate-700 hover:border-slate-600' : 'border-slate-300 hover:border-slate-400'
                        } focus:outline-none`}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Message <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    required
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 resize-none ${theme === 'dark'
                      ? 'bg-slate-900/50 border text-white placeholder-slate-500'
                      : 'bg-slate-50 border text-slate-900 placeholder-slate-400'
                      } ${focusedField === 'message'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : theme === 'dark' ? 'border-slate-700 hover:border-slate-600' : 'border-slate-300 hover:border-slate-400'
                      } focus:outline-none`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full" />
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Designed & Built by <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Sushant Raj Mishra</span>
          </p>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
            © 2026 All rights reserved. Made with love and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
}