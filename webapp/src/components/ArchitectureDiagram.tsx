import React from 'react';

interface ArchitectureDiagramProps {
  activeSystems?: string[];
  activeFlow?: { from: string; to: string } | null;
}

const SystemBox: React.FC<{ title: string; subtitle: string; color: string; className?: string, isActive?: boolean }> = ({ title, subtitle, color, className, isActive = false }) => (
    <div className={`text-center p-4 border-2 ${color} rounded-lg bg-gray-900/80 shadow-lg backdrop-blur-sm transition-all duration-300 ${isActive ? 'ring-4 ring-indigo-400 scale-105' : 'ring-0 ring-transparent'} ${className}`}>
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
);

const Arrow: React.FC<{ text: string; className?: string, isVertical?: boolean, isActive?: boolean }> = ({ text, className, isVertical = false, isActive = false }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <div className={`absolute w-full h-full flex items-center justify-center`}>
            <div className={`h-0.5 ${isVertical ? 'w-0.5 h-full' : 'w-full h-0.5'} ${isActive ? 'bg-indigo-400' : 'bg-gray-600'} transition-colors duration-300`}></div>
            <div className={`absolute ${isVertical ? 'bottom-0 transform -translate-x-1/2 left-1/2' : 'right-0 transform -translate-y-1/2 top-1/2'}`}>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform ${isActive ? 'text-indigo-400' : 'text-gray-500'} transition-colors duration-300`} style={{ transform: isVertical ? 'rotate(90deg)' : 'none' }}>
                  <path d="M5 10L10 5L5 0" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
        </div>
        <span className={`relative bg-gray-950/50 px-2 text-xs ${isActive ? 'text-white font-bold' : 'text-indigo-400'} font-mono transition-colors duration-300`}>{text}</span>
    </div>
);


export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ activeSystems = [], activeFlow = null }) => {
    const isSystemActive = (systemName: string) => activeSystems.includes(systemName);
    const isFlowActive = (from: string, to: string) => activeFlow?.from === from && activeFlow?.to === to;

    return (
        <section className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-8 lg:gap-x-4 items-center">
                {/* Column 1: User */}
                <div className="flex flex-col items-center">
                    <div className={`text-5xl mb-2 transition-transform duration-300 ${isSystemActive('User') ? 'scale-125' : ''}`}>👤</div>
                    <div className="font-bold text-white">User</div>
                </div>

                {/* Column 2: Arrow to Gateway */}
                <Arrow text="Access App" isActive={isFlowActive('User', 'Authentik')} />

                {/* Column 3: Gateway -> Core */}
                <div className="flex flex-col items-stretch gap-y-4">
                    <SystemBox title="Authentik" subtitle="Gateway" color="border-teal-500" isActive={isSystemActive('Authentik')} />
                    <Arrow text="OIDC Federation" isVertical={true} className="h-16" isActive={isFlowActive('Authentik', 'Zitadel') || isFlowActive('Zitadel', 'Authentik')} />
                    <SystemBox title="Zitadel" subtitle="Core IdP" color="border-indigo-500" isActive={isSystemActive('Zitadel')} />
                </div>
                
                {/* Column 4: Arrow to App */}
                 <Arrow text="Proxy User" isActive={isFlowActive('Authentik', 'Nextcloud')} />

                {/* Column 5: Application */}
                <SystemBox title="Nextcloud" subtitle="User Plane" color="border-fuchsia-500" isActive={isSystemActive('Nextcloud')} />
            </div>
             {/* SCIM Provisioning Arrow - this is a more complex path */}
            <div className="relative mt-8 flex justify-center items-center h-16">
                 <div className="absolute top-0 w-0.5 h-8 bg-gray-700" style={{ left: 'calc(50% + 40px)' }}></div>
                <div className={`absolute top-8 h-0.5 ${isFlowActive('Zitadel', 'Nextcloud') ? 'bg-indigo-400' : 'bg-gray-700'} transition-colors duration-300`} style={{ left: 'calc(50% - 160px)', right: 'calc(50% + 40px)' }}></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-700" style={{ left: 'calc(50% - 160px)' }}></div>
                <span className={`absolute top-6 left-1/2 transform -translate-x-full bg-gray-900/50 px-2 text-xs ${isFlowActive('Zitadel', 'Nextcloud') ? 'text-white font-bold' : 'text-indigo-400'} font-mono transition-colors duration-300`} style={{left: 'calc(50% - 20px)'}}>SCIM Provisioning</span>
                <div className="absolute bottom-0 transform -translate-x-1/2 left-1/2" style={{left: 'calc(50% - 160px)'}}>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform ${isFlowActive('Zitadel', 'Nextcloud') ? 'text-indigo-400' : 'text-gray-500'} transition-colors duration-300 rotate-90`}>
                        <path d="M5 10L10 5L5 0" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    );
};
