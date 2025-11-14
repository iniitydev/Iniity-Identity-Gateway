import React from 'react';
import type { ConnectedApplication } from '@iniity/types';

interface ApplicationListProps {
    applications: ConnectedApplication[];
}

export const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
    return (
        <div className="bg-gray-900/50 rounded-lg shadow-lg border border-gray-800">
            <header className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Connected Applications</h3>
                <p className="text-sm text-gray-400">Services you've authorized to access your Iniity account.</p>
            </header>
            <div className="divide-y divide-gray-700">
                {applications.map(app => (
                    <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <img src={app.logoUrl} alt={app.name} className="h-10 w-10 rounded-md bg-white p-1" />
                            <div>
                                <h4 className="font-semibold text-white">{app.name}</h4>
                                <p className="text-sm text-gray-400">{app.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Permissions: <span className="font-mono text-gray-400">{app.scopes.join(', ')}</span>
                                </p>
                            </div>
                        </div>
                        <button className="text-sm text-red-400 hover:text-red-300 hover:underline font-semibold transition-colors">Revoke</button>
                    </div>
                ))}
            </div>
        </div>
    );
};