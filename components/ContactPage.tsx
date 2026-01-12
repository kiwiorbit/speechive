
import React, { useState } from 'react';
import { Page } from '../types';
import emailjs from '@emailjs/browser';

interface ContactPageProps {
    setActivePage: (page: Page) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setActivePage }) => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        message: '',
        researchConsent: false
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    // --- EMAILJS CONFIGURATION ---
    // 1. Service ID from your screenshot
    const SERVICE_ID = 'service_v36lujm'; 
    
    // 2. Template ID from your prompt
    const TEMPLATE_ID = 'template_dx1ihb1';

    // 3. YOUR PUBLIC KEY (Account -> API Keys)
    const PUBLIC_KEY = 'x4W9n_2fukvAC5Q55'; 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setFormData(prev => ({ ...prev, researchConsent: !prev.researchConsent }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all required fields.");
            return;
        }

        setStatus('sending');

        // Prepare parameters to match your specific EmailJS Template
        // We send both 'name' and 'from_name' because your template uses both in different places.
        const templateParams = {
            // Variables for the Email Body (as seen in your screenshot)
            from_name: formData.name,
            from_email: formData.email,
            consent_status: formData.researchConsent ? "Yes, I am happy to be emailed by researchers." : "No consent given.",
            message: formData.message,
            
            // Variables for the Sidebar/Headers (Reply-To, From Name)
            name: formData.name,
            email: formData.email,
        };

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            setStatus('success');
            setFormData({ name: '', email: '', message: '', researchConsent: false });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-white flex flex-col items-center font-sans" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
            <div className="max-w-md w-full flex flex-col h-full p-6 animate-fadeIn relative">
                
                {/* Header: Simple Back Button */}
                <div className="flex items-center space-x-4 mb-2 flex-shrink-0 z-10">
                    <button 
                        onClick={() => setActivePage(Page.Settings)} 
                        className="text-gray-400 hover:text-amber-600 transition-colors p-2 -ml-2 rounded-full hover:bg-amber-50" 
                        aria-label="Go back"
                    >
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                </div>

                {/* Success State Overlay */}
                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center flex-grow text-center animate-slide-up-bottom">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <i className="fas fa-paper-plane text-green-500 text-4xl animate-bounce"></i>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            Message Sent!
                        </h2>
                        <p className="text-gray-500 text-lg mb-8 max-w-xs mx-auto">
                            Thank you for reaching out. We will get back to you at your email address shortly.
                        </p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Send Another
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
                        {/* Title & Description Section */}
                        <div className="text-center mb-6 flex-shrink-0">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                                <i className="fas fa-envelope-open-text text-amber-500 text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                                Contact Us
                            </h2>
                            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                Please don't hesitate to contact us via this form if you want to participate in our Family Support Programme, have anything you would like to share, or want to get in touch for collaboration. We will reply as soon as possible.
                            </p>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="space-y-5 flex-grow pb-8">
                            
                            {/* Name Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Name</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="e.g. Suzanne"
                                        className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-amber-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none placeholder-gray-300"
                                    />
                                    <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="e.g. suzanne@gmail.com"
                                        className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-amber-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none placeholder-gray-300"
                                    />
                                    <i className="fas fa-at absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Message</label>
                                <div className="relative">
                                    <textarea 
                                        name="message" 
                                        value={formData.message} 
                                        onChange={handleInputChange} 
                                        required 
                                        rows={4}
                                        placeholder="Let us know your concerns..."
                                        className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-amber-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none placeholder-gray-300 resize-none"
                                    ></textarea>
                                    <i className="fas fa-comment-alt absolute left-4 top-6 text-gray-400 text-lg"></i>
                                </div>
                            </div>

                            {/* Research Consent Checkbox */}
                            <div 
                                className="flex items-center p-3 cursor-pointer group bg-gray-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors" 
                                onClick={handleCheckboxChange}
                            >
                                <div className={`w-6 h-6 flex-shrink-0 rounded border-2 mr-3 flex items-center justify-center transition-colors ${formData.researchConsent ? 'bg-amber-500 border-amber-500' : 'border-gray-300 bg-white group-hover:border-amber-400'}`}>
                                    {formData.researchConsent && <i className="fas fa-check text-white text-xs"></i>}
                                </div>
                                <span className="text-sm text-gray-600 select-none group-hover:text-gray-800 font-medium">
                                    I am happy to be emailed by the researchers.
                                </span>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button 
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'SEND MESSAGE'
                                    )}
                                </button>
                                
                                {status === 'error' && (
                                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 mt-4 flex items-start animate-fadeIn">
                                        <i className="fas fa-exclamation-circle text-rose-500 mt-0.5 mr-2"></i>
                                        <p className="text-rose-600 text-sm">
                                            We couldn't send your message. Please email us directly at support@whanautalk.co.nz
                                        </p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactPage;
