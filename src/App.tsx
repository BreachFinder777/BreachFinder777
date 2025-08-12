import React, { useEffect, useRef, useState } from 'react';
import { Github, Instagram, Linkedin, Code, TrendingUp, Shield, Rocket, Star, Globe, Terminal, ExternalLink, Mail, ChevronDown, Award, Target, Briefcase } from 'lucide-react';

const ProfessionalPortfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const generateStars = () => {
    return Array.from({ length: 80 }, (_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 1.5 + 0.5}px`,
          height: `${Math.random() * 1.5 + 0.5}px`,
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  };

  const techStack = [
    { name: 'Python', level: 90, category: 'Programming Languages' },
    { name: 'JavaScript', level: 85, category: 'Programming Languages' },
    { name: 'Java', level: 80, category: 'Programming Languages' },
    { name: 'C', level: 75, category: 'Programming Languages' },
    { name: 'HTML5', level: 88, category: 'Web Technologies' },
    { name: 'CSS3', level: 85, category: 'Web Technologies' },
    { name: 'Next.js', level: 82, category: 'Frameworks' },
    { name: 'Cybersecurity', level: 88, category: 'Specializations' },
  ];

  const projects = [
    {
      title: "Algorithmic Trading System",
      description: "Advanced Python-based trading algorithms with real-time market analysis, risk management, and automated execution strategies for financial markets.",
      tech: ["Python", "Pandas", "NumPy", "Financial APIs"],
      status: "Active Development",
      category: "FinTech"
    },
    {
      title: "CTF Challenge Solutions",
      description: "Comprehensive collection of cybersecurity challenges, writeups, and solutions from various Capture The Flag competitions and security research.",
      tech: ["Python", "Linux", "Cryptography", "Network Security"],
      status: "Ongoing",
      category: "Cybersecurity"
    },
    {
      title: "Full-Stack Web Applications",
      description: "Modern, responsive web applications built with cutting-edge technologies, focusing on performance, security, and user experience.",
      tech: ["React", "Next.js", "JavaScript", "CSS3"],
      status: "Portfolio",
      category: "Web Development"
    }
  ];

  const achievements = [
    { title: "CTF Competitions", value: "Active Participant", icon: Shield },
    { title: "Trading Algorithms", value: "In Development", icon: TrendingUp },
    { title: "GitHub Projects", value: "Open Source", icon: Code },
    { title: "Learning Path", value: "Full-Stack Dev", icon: Rocket }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0">
          {generateStars()}
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
        
        {/* Parallax Grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Soham Datta</div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  aria-label={`Navigate to ${item} section`}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center z-10 pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <img
              src="https://github.com/Soham-78micro/Gifs/blob/main/ezgif-6-444bc44d7c-unscreen.gif?raw=true"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-2 border-gray-700 shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Soham Datta
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 space-y-2">
            <p className="flex items-center justify-center space-x-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>CTF Player & Cybersecurity Enthusiast</span>
            </p>
            <p className="flex items-center justify-center space-x-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>Trader & Financial Analyst</span>
            </p>
            <p className="flex items-center justify-center space-x-3">
              <Code className="w-5 h-5 text-purple-400" />
              <span>Python Algorithmic Trading Developer</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <a 
              href="https://github.com/BreachFinder777"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub Profile"
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View GitHub</span>
            </a>
            <a 
              href="#contact"
              aria-label="Contact Section"
              className="border border-gray-600 hover:border-gray-400 hover:bg-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate cybersecurity enthusiast and algorithmic trading developer who thrives at the intersection of technology and finance. 
                My expertise spans from solving complex CTF challenges to developing sophisticated trading algorithms.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Currently focused on building robust full-stack applications while diving deep into financial markets through Python-based algorithmic strategies. 
                I'm always eager to learn and grow in emerging technologies.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <achievement.icon className="w-6 h-6 text-blue-400 mb-2" />
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://github.com/Soham-78micro/Gifs/blob/main/219923809-b86dc415-a0c2-4a38-b-unscreen.gif?raw=true"
                alt="Coding"
                className="rounded-lg border border-gray-800 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 z-10 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(
              techStack.reduce((acc, tech) => {
                if (!acc[tech.category]) acc[tech.category] = [];
                acc[tech.category].push(tech);
                return acc;
              }, {} as Record<string, typeof techStack>)
            ).map(([category, skills]) => (
              <div key={category} className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-blue-400">{category}</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-400">{project.status}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span 
                      key={item}
                      className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 z-10 bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Interested in collaborating on cybersecurity projects, algorithmic trading, or full-stack development? 
            Let's connect and explore opportunities together.
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <a
              href="https://www.linkedin.com/in/soham-datta-%E2%80%8E-83953428a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group bg-gray-900 hover:bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-blue-400" />
            </a>
            <a
              href="https://www.instagram.com/soham_988/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="group bg-gray-900 hover:bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <Instagram className="w-6 h-6 text-pink-400" />
            </a>
            <a
              href="https://github.com/BreachFinder777"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group bg-gray-900 hover:bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-gray-400" />
            </a>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-6">Current Focus Areas</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">CTF Competitions</span>
                <span className="text-green-400 font-mono">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Trading Algorithms</span>
                <span className="text-yellow-400 font-mono">DEVELOPING</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Full-Stack Projects</span>
                <span className="text-blue-400 font-mono">IN PROGRESS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">New Opportunities</span>
                <span className="text-purple-400 font-mono">OPEN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 z-10 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Soham Datta | Cybersecurity Enthusiast & Algorithmic Trading Developer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalPortfolio;