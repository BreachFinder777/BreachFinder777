import { useState, useEffect } from 'react';
import { cn } from './utils/cn';

// ASCII Art Component Removed

// Typewriter Text Component
const TypewriterText = ({ text, speed = 150 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText(''); 
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(() => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="font-mono font-bold text-terminal-green tracking-wider">
      {displayText}
      <span className="animate-pulse text-white">_</span>
    </span>
  );
};

// Navigation Item Component
interface NavItemProps {
  path: string;
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ path, label, icon, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-all duration-150",
      "border-l-2 font-medium",
      active
        ? "border-terminal-green text-terminal-green bg-terminal-green/5"
        : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700"
    )}
  >
    <span className="text-terminal-amber opacity-70">{icon}</span>
    <span className="font-mono">{path}</span>
    <span className="text-gray-600">→</span>
    <span className="ml-auto">{label}</span>
  </button>
);

// System Dependency Loading Component
const SystemDependencies = () => {
  const [loaded, setLoaded] = useState<string[]>([]);
  
  const dependencies = [
    { name: "python-core", version: "3.11.4", status: "loaded" },
    { name: "next.js-runtime", version: "14.x", status: "loaded" },
    { name: "java-vm", version: "17.0.8", status: "loaded" },
    { name: "c-compiler", version: "gcc 13.2", status: "loaded" },
    { name: "cybersec-libs", version: "2.0.1", status: "loading" },
    { name: "trading-engine", version: "1.3.0", status: "pending" },
  ];

  useEffect(() => {
    dependencies.forEach((dep, index) => {
      setTimeout(() => {
        setLoaded(prev => [...prev, dep.name]);
      }, index * 400);
    });
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
        <span className="text-terminal-green">$</span>
        <span>loading system dependencies...</span>
      </div>
      {dependencies.map((dep) => {
        const isLoaded = loaded.includes(dep.name);
        return (
          <div key={dep.name} className="flex items-center justify-between text-xs py-1 border-b border-gray-800">
            <span className="text-gray-400">{dep.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">v{dep.version}</span>
              {isLoaded ? (
                <span className="text-stock-green">[✓ OK]</span>
              ) : (
                <span className="text-gray-600 animate-pulse">[...]</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Live Ticker Component
const LiveTicker = () => {
  const [tickers, setTickers] = useState([
    { symbol: "BTC/USD", price: "67,432.50", change: "+2.34%", up: true },
    { symbol: "ETH/USD", price: "3,521.80", change: "-1.12%", up: false },
    { symbol: "SPY", price: "512.34", change: "+0.45%", up: true },
    { symbol: "AAPL", price: "178.92", change: "-0.89%", up: false },
    { symbol: "NVDA", price: "892.15", change: "+3.21%", up: true },
    { symbol: "SOHAM-SEC", price: "CLASSIFIED", change: "SECURE", up: true },
    { symbol: "CTF-SCORE", price: "12,847", change: "+156", up: true },
    { symbol: "THREAT-LVL", price: "ELEVATED", change: "MONITORING", up: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => {
        if (typeof t.change === 'string' && t.change === "CLASSIFIED") return t;
        const isUp = Math.random() > 0.5;
        const changeVal = (Math.random() * 2).toFixed(2);
        return {
          ...t,
          price: typeof t.price === 'number' 
            ? (t.price + (Math.random() - 0.5) * 10).toFixed(2)
            : t.price,
          change: isUp ? `+${changeVal}%` : `-${changeVal}%`,
          up: isUp
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-terminal-gray border-t border-terminal-green/30 overflow-hidden">
      <div className="flex items-center gap-8 py-2 px-4 animate-marquee whitespace-nowrap">
        <div className="flex items-center gap-2 text-terminal-green">
          <span className="w-2 h-2 rounded-full bg-terminal-green pulse-live"></span>
          <span className="text-xs font-bold">LIVE</span>
        </div>
        {tickers.map((ticker, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <span className="text-gray-400">{ticker.symbol}</span>
            <span className="text-white font-medium">{ticker.price}</span>
            <span className={ticker.up ? "text-stock-green" : "text-stock-red"}>
              {ticker.change}
            </span>
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {tickers.map((ticker, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-3 text-xs">
            <span className="text-gray-400">{ticker.symbol}</span>
            <span className="text-white font-medium">{ticker.price}</span>
            <span className={ticker.up ? "text-stock-green" : "text-stock-red"}>
              {ticker.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// System Log Entry Component
interface LogEntryProps {
  timestamp: string;
  type: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

const LogEntry = ({ timestamp, type, message }: LogEntryProps) => {
  const typeColors = {
    info: 'text-blue-400',
    warn: 'text-terminal-amber',
    error: 'text-stock-red',
    success: 'text-stock-green'
  };

  const typeLabels = {
    info: 'INFO',
    warn: 'WARN',
    error: 'ERROR',
    success: 'SUCCESS'
  };

  return (
    <div className="flex gap-4 text-xs py-1 border-b border-gray-800/50">
      <span className="text-gray-600 shrink-0">[{timestamp}]</span>
      <span className={cn("shrink-0 w-16", typeColors[type])}>{typeLabels[type]}</span>
      <span className="text-gray-300">{message}</span>
    </div>
  );
};

// Main App Component
export function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [systemTime, setSystemTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    { id: 'about', path: '/root', label: 'ABOUT', icon: '▸' },
    { id: 'security', path: '/security', label: 'SECURITY', icon: '◆' },
    { id: 'trading', path: '/finance', label: 'TRADING', icon: '◈' },
    { id: 'projects', path: '/projects', label: 'PROJECTS', icon: '▤' },
    { id: 'contact', path: '/contact', label: 'CONTACT', icon: '✉' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="border border-terminal-green/30 bg-terminal-gray/50 p-4 scanline">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-terminal-green">┌─</span>
                <span className="text-terminal-green font-bold">DECRYPTED_FILE: profile.dat</span>
                <span className="text-gray-600 ml-auto text-xs">[ENCRYPTION: NONE]</span>
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Soham Datta
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 bg-terminal-green/10 text-terminal-green text-xs border border-terminal-green/30">
                  CYBERSECURITY RESEARCHER
                </span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs border border-blue-500/30">
                  QUANTITATIVE TRADER
                </span>
                <span className="px-2 py-1 bg-terminal-amber/10 text-terminal-amber text-xs border border-terminal-amber/30">
                  FULL-STACK DEVELOPER
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                Building full-stack applications that bridge the gap between secure infrastructure 
                and automated financial systems. Specializing in penetration testing, CTF strategies, 
                algorithmic trading development, and financial market modeling.
              </p>
            </div>

            {/* System Log Style About */}
            <div className="border border-gray-800 bg-black/50 p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500">┌─</span>
                <span className="text-gray-400 font-bold">SYSTEM_LOG: background.log</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <LogEntry timestamp="2024.001" type="info" message="Initialized secure environment" />
                <LogEntry timestamp="2024.002" type="success" message="Loaded penetration testing framework" />
                <LogEntry timestamp="2024.003" type="info" message="Connected to trading infrastructure" />
                <LogEntry timestamp="2024.004" type="warn" message="Detected market opportunity patterns" />
                <LogEntry timestamp="2024.005" type="success" message="Algorithmic models deployed" />
                <LogEntry timestamp="2024.006" type="info" message="System operational" />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="border border-stock-red/30 bg-stock-red/5 p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-stock-red">⚠</span>
                <span className="text-stock-red font-bold">SECURITY OPERATIONS CENTER</span>
              </div>
              <div className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                Penetration Testing & Digital Forensics
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-3 border border-gray-800">
                  <div className="text-terminal-green text-xs mb-2">// CAPABILITIES</div>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Network vulnerability assessment</li>
                    <li>• Web application penetration testing</li>
                    <li>• Capture The Flag strategy development</li>
                    <li>• Digital forensics & incident response</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-3 border border-gray-800">
                  <div className="text-terminal-amber text-xs mb-2">// CERTIFICATIONS</div>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• OSCP Certification Track</li>
                    <li>• CEH Preparation</li>
                    <li>• Bug Bounty Hunter</li>
                    <li>• CTF Tournament Winner</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ASCII Shield */}
            <pre className="text-[8px] sm:text-[10px] text-gray-600 leading-tight select-none">
{`
    _________________
   | ________________ |
   |  _     _     _  |
   | | |   | |   | | |
   | | |___| |___| | |
   | |             | |
   | |   SECURE    | |
   | |_____________| |
   |_________________|
`}
            </pre>
          </div>
        );

      case 'trading':
        return (
          <div className="space-y-6">
            <div className="border border-stock-green/30 bg-stock-green/5 p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-stock-green">◈</span>
                <span className="text-stock-green font-bold">ALGORITHMIC TRADING DIVISION</span>
              </div>
              <div className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                Automated Financial Systems
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-3 border border-gray-800">
                  <div className="text-stock-green text-xs mb-2">// TRADING FOCUS</div>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Quantitative strategy development</li>
                    <li>• Technical analysis automation</li>
                    <li>• High-frequency trading systems</li>
                    <li>• Risk management frameworks</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-3 border border-gray-800">
                  <div className="text-blue-400 text-xs mb-2">// MARKETS</div>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Equities & Options</li>
                    <li>• Cryptocurrency</li>
                    <li>• Forex</li>
                    <li>• Derivatives</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mock Portfolio Performance */}
            <div className="border border-gray-800 bg-black/50 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-xs">PORTFOLIO_SIMULATION</span>
                <span className="text-stock-green text-xs">▲ +127.4% YTD</span>
              </div>
              <div className="h-24 flex items-end gap-1">
                {[65, 72, 68, 75, 82, 78, 88, 92, 85, 95, 100, 98, 105, 112, 108, 115, 120, 118, 125, 130].map((h, i) => (
                  <div 
                    key={i}
                    className="flex-1 bg-terminal-green/30 hover:bg-terminal-green/60 transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              /root/projects
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "KernelKure", desc: "Production-grade Linux system diagnostic & repair tool for Debian/RHEL/Arch systems", lang: "BASH", status: "PRODUCTION" },
                { name: "Boot_Saviour", desc: "Automated GRUB detection and fix for major Linux distributions", lang: "SHELL", status: "STABLE" },
              ].map((project, i) => (
                <div 
                  key={i}
                  className="glitch bg-black/50 border border-gray-800 p-4 hover:border-terminal-green/50 transition-all cursor-pointer"
                  data-text={project.name}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-terminal-green font-bold">{project.name}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5",
                      (project.status === "ACTIVE" || project.status === "PRODUCTION") ? "bg-stock-green/20 text-stock-green" : 
                      (project.status === "MAINTAINED" || project.status === "STABLE") ? "bg-terminal-amber/20 text-terminal-amber" :
                      "bg-gray-700 text-gray-500"
                    )}>
                      [{project.status}]
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{project.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-blue-400">{project.lang}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              /root/contact
            </div>
            <div className="border border-gray-800 bg-black/50 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-terminal-green w-24 text-xs">EMAIL</span>
                  <a href="mailto:soham@securetrader.dev" className="text-gray-300 hover:text-terminal-green transition-colors">
                    soham@securetrader.dev
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-terminal-green w-24 text-xs">GITHUB</span>
                  <a href="#" className="text-gray-300 hover:text-terminal-green transition-colors">
                    @soham-datta
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-terminal-green w-24 text-xs">PGP KEY</span>
                  <span className="text-gray-500 text-xs font-mono">0x4A7E 9B2C 3F1D 8E6A</span>
                </div>
              </div>
            </div>

            <div className="border border-terminal-green/30 bg-terminal-green/5 p-4">
              <div className="text-center">
                <div className="text-terminal-green mb-2">$</div>
                <div className="text-gray-400 text-sm">Ready to collaborate on secure, automated systems</div>
                <div className="text-gray-600 text-xs mt-4">Encrypted channels preferred</div>
              </div>
            </div>

            {/* ASCII Contact */}
            <pre className="text-[8px] sm:text-[10px] text-gray-600 leading-tight select-none text-center">
{`
   ╔═══════════════════════════╗
   ║   SECURE COMMUNICATION    ║
   ║      ESTABLISHED ████      ║
   ║    ENCRYPTION: AES-256    ║
   ╚═══════════════════════════╝
`}
            </pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-terminal-dark grid-pattern">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-dark/95 border-b border-gray-800 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <TypewriterText text="fs0c13ty4444" speed={150} />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden md:flex items-center gap-2 text-gray-500">
              <span className="text-terminal-green">SYS_TIME</span>
              <span className="text-white">
                {systemTime.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stock-green pulse-live"></span>
              <span className="text-stock-green">ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="pt-14 pb-16 flex">
        {/* Sidebar Navigation - Directory Tree Style */}
        <nav className="fixed left-0 top-14 bottom-16 w-56 bg-terminal-dark/80 border-r border-gray-800 overflow-y-auto no-scrollbar">
          <div className="p-4">
            <div className="text-gray-600 text-xs mb-4 font-mono">
              <span className="text-terminal-green">root@portfolio</span>:<span className="text-blue-400">~</span>$
            </div>
            <div className="space-y-1">
              {sections.map((section) => (
                <NavItem
                  key={section.id}
                  path={section.path}
                  label={section.label}
                  icon={section.icon}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </div>

            {/* System Dependencies Panel */}
            <div className="mt-8 pt-4 border-t border-gray-800">
              <div className="text-gray-600 text-xs mb-2 px-3">DEPENDENCIES</div>
              <SystemDependencies />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="ml-56 flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Live Ticker */}
      <LiveTicker />
    </div>
  );
}
