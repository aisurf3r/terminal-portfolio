import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Clock, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
      setBatteryLevel(prev => prev > 5 ? Math.max(prev - (1 / 60), 0) : prev); 
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getThemeInfo = () => {
    switch (theme) {
      case 'matrix':
        return { name: 'Matrix', color: '#00ff00' };
      case 'amber':
        return { name: 'Amber', color: '#ffbf00' };
      case 'blue':
        return { name: 'Blue', color: '#00bfff' };
      case 'white':
        return { name: 'Light', color: '#333333' };
      default:
        return { name: 'Matrix', color: '#00ff00' };
    }
  };

  const themeInfo = getThemeInfo();

  return (
    <div className="status-bar bg-terminal-header text-terminal-text px-4 py-2 text-xs font-mono border-t border-terminal-border">
      <div className="flex items-center justify-between">
        {/* Left side - System info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-terminal-accent">aisurf3r@portfolio</span>
            <span className="text-terminal-muted">:</span>
            <span className="text-terminal-text">~$</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-terminal-muted">theme:</span>
            <span className="text-terminal-accent">{themeInfo.name.toLowerCase()}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Clock size={12} className="text-terminal-muted" />
            <span className="text-terminal-muted">uptime:</span>
            <span className="text-terminal-text">{formatUptime(uptime)}</span>
          </div>
        </div>

        {/* Right side - Status indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
  {batteryLevel <= 10 && (
    <button
      className="mr-1 bg-red-500 text-white px-1 py-0 rounded text-xs"
      onClick={() => setBatteryLevel(100)}
    >
      Generator ON
    </button>
  )}
  <Wifi size={12} className="text-green-500" />
  <span className="text-terminal-text">connected</span>
</div>

          <div className="flex items-center space-x-1">
            <Signal size={12} className="text-green-500" />
            <span className="text-terminal-text">strong</span>
          </div>

          <div className="flex items-center space-x-1">
            <Battery size={12} className={batteryLevel <= 10 ? 'text-red-500' : 'text-green-500'} />
            {batteryLevel <= 10 && <AlertTriangle size={12} className="text-red-500" />}
            <span className="text-terminal-text">{Math.round(batteryLevel)}%</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-terminal-muted">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};