'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredTab, setHoveredTab] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = [
    { name: 'All', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Archive', href: '/archive' }
  ];

  const handleTabClick = async (e, href) => {
    e.preventDefault();
    setSelectedTab(href);
    setIsTransitioning(true);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    router.push(href);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-8 px-4 relative z-50">
      <nav className="relative flex justify-center items-center">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const isHovered = hoveredTab === tab.name;
            const isSelected = selectedTab === tab.href;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={(e) => handleTabClick(e, tab.href)}
                className={`
                  relative px-4 py-2 text-sm font-medium 
                  transition-all duration-200 ease-out
                  hover:text-white cursor-pointer
                  ${isActive || isHovered ? 'text-white' : 'text-gray-400'}
                  ${isTransitioning ? 'pointer-events-none' : ''}
                `}
                onMouseEnter={() => setHoveredTab(tab.name)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                {tab.name}
                <div
                  className={`
                    absolute bottom-0 left-0 w-full h-[2px] 
                    transition-all duration-200 ease-out transform
                    ${isActive || isSelected ? 'bg-blue-500' : 'bg-blue-400'}
                    origin-left
                    ${isActive || isSelected ? 'scale-x-100' : 'scale-x-0'}
                    ${isHovered && !isActive ? 'scale-x-100' : ''}
                  `}
                />
              </Link>
            );
          })}
        </div>
        
        {/* Animated track */}
        <div className="absolute -inset-x-2 -top-2 -bottom-2 pointer-events-none">
          <div className="track">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <div 
                className={`
                  absolute inset-0 
                  bg-gradient-to-r from-transparent via-blue-500/10 to-transparent 
                  transition-opacity duration-500
                  ${hoveredTab ? 'opacity-100' : 'opacity-0'}
                `} 
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
} 