import React from 'react';

const SettingItem: React.FC<{ title: string; description: string; actionText: string }> = ({ title, description, actionText }) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline font-semibold transition-colors">{actionText}</button>
    </div>
);

export const SecuritySettingsCard: React.FC = () => {
    return (
        <div className="bg-gray-900/50 rounded-lg shadow-lg p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-2">Security Settings</h3>
            <div className="divide-y divide-gray-700">
                <SettingItem
                    title="Password"
                    description="Last changed 3 months ago"
                    actionText="Change"
                />
                <SettingItem
                    title="Two-Factor Authentication"
                    description="Authenticator app enabled"
                    actionText="Manage"
                />
                 <SettingItem
                    title="Passkeys & Biometrics"
                    description="1 passkey active"
                    actionText="Manage"
                />
            </div>
        </div>
    );
};