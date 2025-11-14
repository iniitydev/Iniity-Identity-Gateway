import React from 'react';
import type { UserSession } from '@iniity/types';
import { DeviceIcon } from './icons/DeviceIcon';


interface SessionManagerProps {
    sessions: UserSession[];
}

export const SessionManager: React.FC<SessionManagerProps> = ({ sessions }) => {
    return (
        <div className="bg-gray-900/50 rounded-lg shadow-lg border border-gray-800">
            <header className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Active Sessions</h3>
                <p className="text-sm text-gray-400">Devices currently logged into your account.</p>
            </header>
            <div className="divide-y divide-gray-700">
                {sessions.map(session => (
                    <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <DeviceIcon className="h-8 w-8 text-gray-400" />
                            <div>
                                <h4 className="font-semibold text-white">{session.device} <span className="text-xs text-gray-500">({session.os})</span></h4>
                                <p className="text-sm text-gray-400">
                                    {session.location} - IP: {session.ip}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                             {session.isCurrent ? (
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-900/50 px-2 py-1 rounded-md">Current Session</span>
                            ) : (
                                <button className="text-sm text-red-400 hover:text-red-300 hover:underline font-semibold transition-colors">Log out</button>
                            )}
                             <p className="text-xs text-gray-500 mt-1">
                                {new Date(session.lastAccessed).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};