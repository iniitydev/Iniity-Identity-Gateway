import React from 'react';
import { mockUserProfile, mockSessions, mockApps } from '../constants';
import { UserProfileCard } from '../components/UserProfileCard';
import { SessionManager } from '../components/SessionManager';
import { ApplicationList } from '../components/ApplicationList';
import { SecuritySettingsCard } from '../components/SecuritySettingsCard';
import { KeyIcon } from '../components/icons/KeyIcon';

const QuickActionButton: React.FC<{ icon: React.ReactNode; label: string; }> = ({ icon, label }) => (
    <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors text-center">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-indigo-400">
            {icon}
        </div>
        <span className="text-xs font-semibold text-gray-300">{label}</span>
    </button>
);

export const UserCenterView: React.FC = () => {
    return (
        <div className="space-y-12">
            <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">User Control Center</h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-400">
                    Your personal command center to manage your digital identity, security, and connected services across the Iniity ecosystem.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <UserProfileCard user={mockUserProfile} />
                    <SecuritySettingsCard />
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gray-900/50 rounded-lg shadow-lg p-6 border border-gray-800">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <QuickActionButton icon={<KeyIcon />} label="Change Password" />
                            <QuickActionButton icon={<KeyIcon />} label="Manage MFA" />
                            <QuickActionButton icon={<KeyIcon />} label="Add Passkey" />
                            <QuickActionButton icon={<KeyIcon />} label="Review Consents" />
                        </div>
                    </div>
                    
                    <SessionManager sessions={mockSessions} />
                    <ApplicationList applications={mockApps} />
                </div>
            </div>
        </div>
    );
};