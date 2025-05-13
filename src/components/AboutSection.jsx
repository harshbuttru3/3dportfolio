import React from 'react';

const AboutSection = () => {
  return (
    <section>
      <div className="content-container hidden">
        <h2 className="title">About Me</h2>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <p style={{ color: '#8892B0', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Hello! I'm Shivam, a passionate Full Stack Developer and Cybersecurity Specialist with 
              a deep interest in building secure and performant web applications.
            </p>
            <p style={{ color: '#8892B0', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              My journey in technology began with a fascination for how systems work and how they can be 
              secured against potential threats. This led me to pursue a dual specialization in both 
              full-stack development and cybersecurity.
            </p>
            <p style={{ color: '#8892B0', fontSize: '1.1rem', lineHeight: '1.7' }}>
              I enjoy creating digital experiences that are not only visually appealing and user-friendly,
              but also built with security as a fundamental consideration from the ground up.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div className="terminal-container" style={{ height: 'auto', maxHeight: 'none', width: '100%' }}>
              <div className="terminal-header">
                <div className="terminal-circle red"></div>
                <div className="terminal-circle yellow"></div>
                <div className="terminal-circle green"></div>
                <span style={{ marginLeft: '10px', color: '#CCD6F6' }}>profile.json</span>
              </div>
              <pre style={{ color: '#64FFDA', margin: '15px 0 0', fontSize: '0.9rem', lineHeight: '1.5' }}>
{`{
  "name": "Shivam",
  "title": "Full Stack Developer & Cybersecurity Specialist",
  "location": "India",
  "focus": [
    "Web Development",
    "Security Architecture",
    "Network Security",
    "System Design"
  ],
  "hobbies": [
    "Competitive Programming",
    "CTF Competitions",
    "Open Source Contributing",
    "Reading Tech Blogs"
  ],
  "languages": [
    "JavaScript/TypeScript",
    "Python",
    "PHP",
    "Java",
    "SQL",
    "Bash"
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 