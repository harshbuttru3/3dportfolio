import React from 'react';

const Skill = ({ name, level, color = '#64FFDA' }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: '#CCD6F6' }}>{name}</span>
        <span style={{ color: '#8892B0' }}>{level}%</span>
      </div>
      <div style={{ width: '100%', height: '6px', backgroundColor: '#1E2D3D', borderRadius: '3px' }}>
        <div 
          style={{ 
            width: `${level}%`, 
            height: '100%', 
            backgroundColor: color,
            borderRadius: '3px' 
          }}
        ></div>
      </div>
    </div>
  );
};

const TechItem = ({ name, iconClass }) => {
  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        padding: '15px',
        width: '110px',
        borderRadius: '5px',
        backgroundColor: 'rgba(30, 45, 61, 0.5)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '2rem', marginBottom: '10px', color: '#64FFDA' }}>
        {iconClass}
      </div>
      <span style={{ color: '#CCD6F6', fontSize: '0.9rem', textAlign: 'center' }}>{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  // Mock data for skills
  const frontendSkills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'CSS/SASS', level: 85 },
    { name: 'Three.js', level: 80 }
  ];
  
  const backendSkills = [
    { name: 'Node.js', level: 92 },
    { name: 'Python', level: 88 },
    { name: 'PHP', level: 80 },
    { name: 'Databases (SQL/NoSQL)', level: 85 }
  ];
  
  const securitySkills = [
    { name: 'Penetration Testing', level: 90 },
    { name: 'Network Security', level: 85 },
    { name: 'Authentication Systems', level: 92 },
    { name: 'Vulnerability Assessment', level: 88 }
  ];
  
  // Using emoji as placeholders for tech stack icons
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'GraphQL', icon: '◢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Three.js', icon: '📊' }
  ];
  
  return (
    <section>
      <div className="content-container hidden">
        <h2 className="title">My Skills</h2>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#CCD6F6', marginBottom: '20px', fontSize: '1.5rem' }}>Technical Proficiency</h3>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h4 style={{ color: '#64FFDA', marginBottom: '15px' }}>Frontend Development</h4>
              {frontendSkills.map((skill, index) => (
                <Skill key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
            
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h4 style={{ color: '#64FFDA', marginBottom: '15px' }}>Backend Development</h4>
              {backendSkills.map((skill, index) => (
                <Skill key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
            
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h4 style={{ color: '#64FFDA', marginBottom: '15px' }}>Cybersecurity</h4>
              {securitySkills.map((skill, index) => (
                <Skill key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 style={{ color: '#CCD6F6', marginBottom: '20px', fontSize: '1.5rem' }}>Technology Stack</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {technologies.map((tech, index) => (
              <TechItem key={index} name={tech.name} iconClass={tech.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 