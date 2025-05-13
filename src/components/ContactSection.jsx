import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Reset form submitted state after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <section>
      <div className="content-container hidden">
        <h2 className="title">Contact Me</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <p style={{ color: '#8892B0', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '30px' }}>
              I'm currently open to new opportunities and would love to hear about your project. 
              Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ color: '#64FFDA', fontSize: '1.2rem', marginRight: '10px' }}>📧</span>
                <a 
                  href="mailto:shivam@example.com" 
                  style={{ 
                    color: '#CCD6F6', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#64FFDA'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#CCD6F6'}
                >
                  shivam@example.com
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ color: '#64FFDA', fontSize: '1.2rem', marginRight: '10px' }}>🔗</span>
                <a 
                  href="https://linkedin.com/in/shivam" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#CCD6F6', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#64FFDA'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#CCD6F6'}
                >
                  linkedin.com/in/shivam
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#64FFDA', fontSize: '1.2rem', marginRight: '10px' }}>💻</span>
                <a 
                  href="https://github.com/shivam" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#CCD6F6', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#64FFDA'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#CCD6F6'}
                >
                  github.com/shivam
                </a>
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="name" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: '#CCD6F6',
                    fontSize: '0.9rem'
                  }}
                >
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1E2D3D',
                    border: '1px solid #4A5567',
                    borderRadius: '4px',
                    color: '#CCD6F6',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: '#CCD6F6',
                    fontSize: '0.9rem'
                  }}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1E2D3D',
                    border: '1px solid #4A5567',
                    borderRadius: '4px',
                    color: '#CCD6F6',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="message" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: '#CCD6F6',
                    fontSize: '0.9rem'
                  }}
                >
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1E2D3D',
                    border: '1px solid #4A5567',
                    borderRadius: '4px',
                    color: '#CCD6F6',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button 
                type="submit"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #64FFDA',
                  color: '#64FFDA',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  display: 'block',
                  width: '100%'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Send Message
              </button>
              
              {formSubmitted && (
                <div 
                  style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    color: '#64FFDA',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}
                >
                  Thanks for your message! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div style={{ marginTop: '60px', textAlign: 'center', color: '#8892B0', fontSize: '0.9rem' }}>
          <p>Designed & Built by Shivam © {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 