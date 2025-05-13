import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ onClose }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Shivam\'s terminal. Type "help" to see available commands.' }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalContentRef = useRef(null);
  
  // User data to be displayed with commands
  const userData = {
    name: 'Shivam',
    title: 'Full Stack Developer & Cybersecurity Specialist',
    location: 'India',
    skills: [
      'Frontend: React, Next.js, Vue.js, Three.js, CSS/SASS, Tailwind',
      'Backend: Node.js, Express, Python, Django, PHP, Laravel',
      'Database: MongoDB, PostgreSQL, MySQL, Redis',
      'DevOps: Docker, AWS, CI/CD, Git',
      'Cybersecurity: Penetration Testing, Security Audits, Network Security, Encryption',
      'Other: RESTful APIs, GraphQL, WebSockets, JWT'
    ],
    projects: [
      {
        name: 'SecureChat',
        description: 'End-to-end encrypted chat application with advanced security features',
        technologies: 'React, Node.js, WebSockets, Encryption'
      },
      {
        name: 'CloudGuard',
        description: 'AWS security monitoring and automatic vulnerability detection tool',
        technologies: 'Python, AWS Lambda, Docker'
      },
      {
        name: 'DataViz Dashboard',
        description: 'Interactive data visualization platform for business intelligence',
        technologies: 'Vue.js, D3.js, Express, PostgreSQL'
      }
    ],
    education: [
      'Bachelor of Technology in Computer Science',
      'Certified Ethical Hacker (CEH)',
      'AWS Certified Solutions Architect'
    ],
    contact: {
      email: 'shivam@example.com',
      linkedin: 'linkedin.com/in/shivam',
      github: 'github.com/shivam'
    }
  };

  // Available commands
  const commands = {
    help: () => {
      return {
        type: 'system',
        content: `
Available commands:
- help: Show this help message
- about: Display information about me
- skills: List my technical skills
- projects: View my recent projects
- education: Show my education background
- contact: Get my contact information
- clear: Clear the terminal
- exit: Close the terminal
        `
      };
    },
    about: () => {
      return {
        type: 'system',
        content: `
Name: ${userData.name}
Title: ${userData.title}
Location: ${userData.location}

I'm a passionate Full Stack Developer and Cybersecurity Specialist with expertise in building 
secure, scalable, and performant web applications. With a strong foundation in both frontend and 
backend technologies, I create seamless user experiences while ensuring robust security measures
are in place. I love tackling complex problems and continuously learning new technologies.
        `
      };
    },
    skills: () => {
      return {
        type: 'system',
        content: `
My Technical Skills:
${userData.skills.map(skill => `• ${skill}`).join('\n')}
        `
      };
    },
    projects: () => {
      return {
        type: 'system',
        content: `
Recent Projects:
${userData.projects.map(project => 
`• ${project.name}: ${project.description}
  Technologies: ${project.technologies}`
).join('\n\n')}
        `
      };
    },
    education: () => {
      return {
        type: 'system',
        content: `
Education:
${userData.education.map(edu => `• ${edu}`).join('\n')}
        `
      };
    },
    contact: () => {
      return {
        type: 'system',
        content: `
Contact Information:
• Email: ${userData.contact.email}
• LinkedIn: ${userData.contact.linkedin}
• GitHub: ${userData.contact.github}
        `
      };
    },
    clear: () => {
      setHistory([]);
      return null;
    },
    exit: () => {
      onClose();
      return null;
    }
  };

  // Scroll to bottom of terminal content when history changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [history]);

  // Focus on terminal content when it mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCommand]);

  const handleKeyDown = (e) => {
    // If Enter is pressed, process the command
    if (e.key === 'Enter') {
      processCommand();
    } else if (e.key === 'Backspace') {
      setCurrentCommand(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setCurrentCommand(prev => prev + e.key);
    }
  };

  const processCommand = () => {
    if (!currentCommand.trim()) return;
    
    // Add user command to history
    const newHistory = [...history, { type: 'user', content: currentCommand }];
    
    // Process command
    const commandName = currentCommand.trim().toLowerCase().split(' ')[0];
    
    if (commands[commandName]) {
      const result = commands[commandName]();
      if (result) {
        newHistory.push(result);
      }
    } else {
      newHistory.push({
        type: 'system',
        content: `Command not found: ${commandName}. Type "help" to see available commands.`
      });
    }
    
    setHistory(newHistory);
    setCurrentCommand('');
  };

  return (
    <div className="container">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-circle red"></div>
          <div className="terminal-circle yellow"></div>
          <div className="terminal-circle green"></div>
          <span style={{ marginLeft: '10px', color: '#CCD6F6' }}>Shivam's Terminal</span>
        </div>
        
        <div ref={terminalContentRef} className="terminal-content">
          {history.map((entry, index) => (
            <div key={index} className="terminal">
              {entry.type === 'user' ? (
                <div>
                  <span style={{ color: '#64FFDA' }}>➜</span> <span style={{ color: '#9D00FF' }}>~</span> $ {entry.content}
                </div>
              ) : (
                <div style={{ whiteSpace: 'pre-line' }}>{entry.content}</div>
              )}
            </div>
          ))}
          <div className="terminal">
            <span style={{ color: '#64FFDA' }}>➜</span> <span style={{ color: '#9D00FF' }}>~</span> $ {currentCommand}
            <span className="typing"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal; 