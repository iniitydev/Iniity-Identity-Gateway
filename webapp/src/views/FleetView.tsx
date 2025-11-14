import React from 'react';
import { mockDevices } from '../constants';
import type { Device } from '@iniity/types';
import { ServerIcon } from '../components/icons/ServerIcon';
import { LaptopIcon } from '../components/icons/LaptopIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';

const getDeviceIcon = (os: Device['os']) => {
    switch (os) {
        case 'Linux':
            return <ServerIcon />;
        case 'macOS':
        case 'Windows':
            return <LaptopIcon />;
        case 'iOS':
        case 'Android':
            return <PhoneIcon />;
        default:
            return <LaptopIcon />;
    }
};

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
    const isOnline = device.status === 'Online';

    return (
        <div className="bg-gray-900/50 rounded-lg shadow-lg border border-gray-800 flex flex-col">
            <div className="p-4 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="text-gray-400">{getDeviceIcon(device.os)}</div>
                    <div>
                        <h3 className="font-bold text-white">{device.name}</h3>
                        <p className="text-xs text-gray-500">{device.os}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                    <span className={`text-sm font-semibold ${isOnline ? 'text-emerald-400' : 'text-gray-500'}`}>{device.status}</span>
                </div>
            </div>
            <div className="p-4 space-y-2 text-sm border-t border-gray-700 flex-grow">
                <p className="text-gray-400">Last Seen: <span className="text-gray-300">{device.lastSeen}</span></p>
                <p className="text-gray-400">Local IP: <span className="font-mono text-gray-300">{device.ip}</span></p>
                {device.networks.length > 0 && (
                     <div>
                        <h4 className="font-semibold text-gray-400 mt-2 mb-1">Overlay Networks:</h4>
                        <ul className="space-y-1">
                            {device.networks.map(net => (
                                <li key={net.type} className="flex justify-between items-center">
                                    <span className="text-indigo-400">{net.type}</span>
                                    <span className="font-mono text-gray-300">{net.ip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
             {device.services.length > 0 && (
                <div className="p-4 border-t border-gray-700">
                    <h4 className="font-semibold text-gray-400 text-sm mb-2">Active Services:</h4>
                    <div className="flex flex-wrap gap-2">
                        {device.services.map(service => (
                            <span key={service} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{service}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};


export const FleetView: React.FC = () => {
    return (
        <div className="space-y-8">
            <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Fleet Management</h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-400">
                    An overview of all devices registered within your Iniity Identity Network (IDN), their current status, and network reachability.
                </p>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockDevices.map(device => (
                    <DeviceCard key={device.id} device={device} />
                ))}
            </section>
        </div>
    );
};
