import React, { useState, useEffect, useRef } from 'react';
import { mockEvents } from '../constants';
import type { IniityEvent } from '@iniity/types';

const EventTypeBadge: React.FC<{ type: IniityEvent['type'] }> = ({ type }) => {
    const typeClasses = {
        'INFO': 'bg-cyan-900/50 text-cyan-300 border-cyan-700',
        'AUDIT': 'bg-blue-900/50 text-blue-300 border-blue-700',
        'WARN': 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
        'ERROR': 'bg-red-900/50 text-red-300 border-red-700',
    };
    return <span className={`px-2 py-1 text-xs font-bold rounded-md border ${typeClasses[type]}`}>{type}</span>;
}

export const OperationsView: React.FC = () => {
    const [events, setEvents] = useState<IniityEvent[]>(mockEvents);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [events]);

    return (
        <div className="space-y-8">
            <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Operations Terminal</h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-400">
                    A real-time firehose of system events, audit logs, and policy engine decisions from across the Iniity federation.
                </p>
            </section>
            
            <section className="bg-black/50 rounded-lg shadow-lg border border-gray-800 font-mono flex flex-col h-[60vh]">
                <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-900/50 rounded-t-lg">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-red-500">●</span>
                        <span className="text-yellow-500">●</span>
                        <span className="text-green-500">●</span>
                        <span className="ml-4 text-gray-300">/var/log/iniity/federation.log</span>
                    </div>
                     <div className="flex items-center gap-2 text-sm text-emerald-400">
                        <span>● LIVE</span>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div ref={scrollRef} className="p-4 overflow-y-auto flex-grow text-sm space-y-2">
                    {events.map(event => (
                        <div key={event.id} className="grid grid-cols-[160px_60px_120px_1fr] gap-4 items-start">
                            <span className="text-gray-500">{new Date(event.timestamp).toLocaleString()}</span>
                            <div className="text-center">
                                <EventTypeBadge type={event.type} />
                            </div>
                            <span className="text-indigo-400 font-semibold">[{event.agent}]</span>
                            <span className="text-gray-300 break-words">{event.message}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-400">iniity@federation-os:~$</span>
                        <div className="w-2 h-4 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};
