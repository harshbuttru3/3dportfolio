import React from 'react';

const ProjectCard = ({ title, description, technologies, link, image }) => {
  return (
    <div 
      style={{ 
        backgroundColor: 'rgba(30, 45, 61, 0.7)',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        margin: '15px',
        width: '340px',
        border: '1px solid rgba(100, 255, 218, 0.1)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.4)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ height: '180px', backgroundColor: '#0A192F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Placeholder for project image */}
        <div style={{ fontSize: '3rem', color: '#64FFDA' }}>{image}</div>
      </div>
      
      <div style={{ padding: '20px' }}>
        <h3 style={{ color: '#CCD6F6', marginBottom: '10px', fontSize: '1.3rem' }}>{title}</h3>
        <p style={{ color: '#8892B0', marginBottom: '15px', fontSize: '0.9rem', lineHeight: '1.6' }}>
          {description}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px', gap: '8px' }}>
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              style={{ 
                backgroundColor: 'rgba(100, 255, 218, 0.1)', 
                color: '#64FFDA', 
                padding: '3px 10px',
                borderRadius: '15px',
                fontSize: '0.8rem'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: '#64FFDA', 
            textDecoration: 'none',
            display: 'inline-block',
            borderBottom: '1px solid #64FFDA',
            paddingBottom: '2px',
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          View Project
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  // Mock projects data
  const projects = [
    {
      title: 'SecureChat',
      description: 'End-to-end encrypted messaging application with advanced security features, perfect for sensitive communications.',
      technologies: ['React', 'Node.js', 'WebSockets', 'Encryption'],
      link: '#',
      image: '🔒'
    },
    {
      title: 'CloudGuard',
      description: 'AWS security monitoring and automatic vulnerability detection tool that helps organizations maintain compliance.',
      technologies: ['Python', 'AWS Lambda', 'Docker', 'CI/CD'],
      link: '#',
      image: '☁️'
    },
    {
      title: 'DataViz Dashboard',
      description: 'Interactive data visualization platform for business intelligence with real-time updates and insights.',
      technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
      link: '#',
      image: '📊'
    },
    {
      title: 'BlockChain Explorer',
      description: 'A tool for visualizing and exploring blockchain transactions with detailed analytics and tracking.',
      technologies: ['React', 'Node.js', 'Web3.js', 'GraphQL'],
      link: '#',
      image: '🔗'
    },
    {
      title: 'AI Code Reviewer',
      description: 'AI-powered code review assistant that automatically detects security vulnerabilities and code quality issues.',
      technologies: ['Python', 'TensorFlow', 'Django', 'Git API'],
      link: '#',
      image: '🤖'
    },
    {
      title: 'Virtual CTF Platform',
      description: 'A platform for hosting and participating in Capture The Flag cybersecurity competitions with various challenges.',
      technologies: ['React', 'Express', 'Docker', 'WebSockets'],
      link: '#',
      image: '🚩'
    }
  ];
  
  return (
    <section>
      <div className="content-container hidden">
        <h2 className="title">My Projects</h2>
        <p style={{ color: '#8892B0', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '700px' }}>
          Here are some of my recent projects that showcase my skills in both development and cybersecurity.
          Each project is built with a focus on security, performance, and user experience.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              link={project.link}
              image={project.image}
            />
          ))}
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <a 
            href="#" 
            style={{ 
              backgroundColor: 'transparent',
              border: '1px solid #64FFDA',
              color: '#64FFDA',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 