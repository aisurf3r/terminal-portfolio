import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [captcha, setCaptcha] = useState({ question: '', answer: '', userAnswer: '' });
  const [captchaError, setCaptchaError] = useState(false);

  // Generate simple math CAPTCHA
  const generateCaptcha = () => {
    const operations = [
      { type: 'add', symbol: '+' },
      { type: 'subtract', symbol: '-' },
      { type: 'multiply', symbol: '*' }
    ];
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, question;
    
    switch (operation.type) {
      case 'add':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        question = `${num1} ${operation.symbol} ${num2}`;
        break;
      case 'subtract':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 - num2;
        question = `${num1} ${operation.symbol} ${num2}`;
        break;
      case 'multiply':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        question = `${num1} ${operation.symbol} ${num2}`;
        break;
      default:
        num1 = 5;
        num2 = 3;
        answer = 8;
        question = '5 + 3';
    }
    
    setCaptcha({ question, answer: answer.toString(), userAnswer: '' });
    setCaptchaError(false);
  };

  // Initialize CAPTCHA on component mount
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate CAPTCHA first
    if (captcha.userAnswer !== captcha.answer) {
      setCaptchaError(true);
      return;
    }
    
    setIsSending(true);
    setCaptchaError(false);

    try {
      await emailjs.send(
        'service_q9pf6x8', // Service ID
        'template_9r5105t', // Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'i3C4pzLyafB6Bzlhb' // Public Key
      );

      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      generateCaptcha(); // Reset CAPTCHA

      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSending(false);
      generateCaptcha(); // Reset CAPTCHA on error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptcha({
      ...captcha,
      userAnswer: e.target.value
    });
    setCaptchaError(false);
  };

  return (
    <div className="contact-section">
      <div className="mb-6">
        <h2 className="text-terminal-accent text-xl font-bold mb-2">📧 Contact Information</h2>
        <p className="text-terminal-muted">
          Let's connect! Send me a message using the terminal-style form below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="contact-info space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-terminal-hover rounded border border-terminal-border">
              <Mail className="text-terminal-accent" size={20} />
              <div>
                <div className="text-terminal-text font-medium">Email</div>
                <div className="text-terminal-muted text-sm">hello@portfolio.dev</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-terminal-hover rounded border border-terminal-border">
              <Phone className="text-terminal-accent" size={20} />
              <div>
                <div className="text-terminal-text font-medium">Phone</div>
                <div className="text-terminal-muted text-sm">+1 (555) 123-4567</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-terminal-hover rounded border border-terminal-border">
              <MapPin className="text-terminal-accent" size={20} />
              <div>
                <div className="text-terminal-text font-medium">Location</div>
                <div className="text-terminal-muted text-sm">San Francisco, CA</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-terminal-accent font-bold">🔗 Social Links</h3>
            <div className="space-y-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 hover:bg-terminal-hover rounded transition-colors"
              >
                <Github size={18} className="text-terminal-accent" />
                <span className="text-terminal-text">github.com/username</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 hover:bg-terminal-hover rounded transition-colors"
              >
                <Linkedin size={18} className="text-terminal-accent" />
                <span className="text-terminal-text">linkedin.com/in/username</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <div className="terminal-window bg-terminal-hover border border-terminal-border rounded-lg overflow-hidden">
            <div className="terminal-header bg-terminal-header p-3 border-b border-terminal-border">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-terminal-muted text-sm">user@portfolio:~/contact$</span>
              </div>
            </div>
            
            <div className="p-4">
              {isSent ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="mx-auto text-green-500\" size={48} />
                  <div className="text-terminal-success">
                    <div className="font-bold">Message sent successfully!</div>
                    <div className="text-sm text-terminal-muted mt-1">
                      I'll get back to you as soon as possible.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-terminal-accent text-sm mb-1">
                      $ echo "Your Name"
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-terminal border border-terminal-border rounded px-3 py-2 text-terminal-text focus:border-terminal-accent focus:outline-none"
                      placeholder="Enter your name..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-terminal-accent text-sm mb-1">
                      $ echo "Your Email"
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-terminal border border-terminal-border rounded px-3 py-2 text-terminal-text focus:border-terminal-accent focus:outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-terminal-accent text-sm mb-1">
                      $ echo "Subject"
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-terminal border border-terminal-border rounded px-3 py-2 text-terminal-text focus:border-terminal-accent focus:outline-none"
                      placeholder="Brief subject line..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-terminal-accent text-sm mb-1">
                      $ cat &gt; message.txt
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-terminal border border-terminal-border rounded px-3 py-2 text-terminal-text focus:border-terminal-accent focus:outline-none resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>
                  
                  {/* Terminal-style CAPTCHA */}
                  <div className="bg-terminal p-3 rounded border border-terminal-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="text-terminal-accent" size={16} />
                      <label className="text-terminal-accent text-sm font-bold">
                        Security Verification
                      </label>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="ml-auto p-1 hover:bg-terminal-hover rounded transition-colors"
                        aria-label="Generate new CAPTCHA"
                      >
                        <RefreshCw size={14} className="text-terminal-muted" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-terminal-text text-sm font-mono">
                        $ calculate: <span className="text-terminal-accent">{captcha.question}</span> = ?
                      </div>
                      <input
                        type="number"
                        value={captcha.userAnswer}
                        onChange={handleCaptchaChange}
                        required
                        className={`w-full bg-terminal-hover border rounded px-3 py-2 text-terminal-text focus:outline-none text-sm ${
                          captchaError 
                            ? 'border-terminal-error focus:border-terminal-error' 
                            : 'border-terminal-border focus:border-terminal-accent'
                        }`}
                        placeholder="Enter the result..."
                      />
                      {captchaError && (
                        <div className="text-terminal-error text-xs flex items-center space-x-1">
                          <span>❌</span>
                          <span>Incorrect answer. Please try again.</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-terminal-accent text-terminal-bg font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSending ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>$ send message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <p className="text-terminal-muted text-sm">
          🔒 <span className="text-terminal-accent">Security:</span> All messages are transmitted securely. 
          I typically respond within 24 hours during business days.
        </p>
      </div>
    </div>
  );
};