import React from 'react';
import type { UserProfile } from '@iniity/types';

interface UserProfileCardProps {
    user: UserProfile;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
    return (
        <div className="bg-gray-900/50 rounded-lg shadow-lg p-6 border border-gray-800">
            <div className="flex flex-col items-center text-center">
                <img src={user.avatarUrl} alt={user.name} className="h-24 w-24 rounded-full border-2 border-indigo-500 mb-4" />
                <div>
                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500 text-center">
                <p>DID: <span className="font-mono text-gray-400 break-all">{user.did}</span></p>
                <p className="mt-1">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <button className="mt-6 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors text-sm shadow-lg">
                Edit Profile
            </button>
        </div>
    );
};