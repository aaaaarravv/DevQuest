export const GitGuildLogo = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background Hexagon */}
    <path 
      d="M50 5L90 28V72L50 95L10 72V28L50 5Z" 
      fill="url(#hex-gradient)" 
      stroke="url(#hex-border)" 
      strokeWidth="4"
    />
    
    {/* Inner Sword / Git Branching */}
    <path 
      d="M50 20V80" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    {/* Branch right */}
    <path 
      d="M50 45L70 30" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    {/* Branch left */}
    <path 
      d="M50 65L30 50" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    
    {/* Nodes */}
    <circle cx="50" cy="20" r="8" fill="#0ea5e9" stroke="white" strokeWidth="3" />
    <circle cx="70" cy="30" r="8" fill="#a855f7" stroke="white" strokeWidth="3" />
    <circle cx="30" cy="50" r="8" fill="#22c55e" stroke="white" strokeWidth="3" />
    <circle cx="50" cy="80" r="8" fill="#0ea5e9" stroke="white" strokeWidth="3" />

    {/* Gradients */}
    <defs>
      <linearGradient id="hex-gradient" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0f172a" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#1e293b" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="hex-border" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9"/>
        <stop offset="0.5" stopColor="#a855f7"/>
        <stop offset="1" stopColor="#22c55e"/>
      </linearGradient>
    </defs>
  </svg>
);
