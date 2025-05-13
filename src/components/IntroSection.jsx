import React from 'react';

const IntroSection = () => {
  return (
    <section>
      <div className="content-container hidden">
        <h1 className="title">Hi, I'm Shivam</h1>
        <h2 style={{ color: '#CCD6F6', fontSize: '2rem', marginBottom: '20px' }}>
          Full Stack Developer &amp; Cybersecurity Specialist
        </h2>
        <p style={{ color: '#8892B0', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '600px' }}>
          I build secure, scalable, and innovative web applications with a focus on both user experience and robust security.
          Hover over me and scroll down to explore my portfolio!
        </p>
        <div style={{ marginTop: '30px' }}>
          <button
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #64FFDA',
              color: '#64FFDA',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: '15px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            View My Projects
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #64FFDA',
              color: '#64FFDA',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 