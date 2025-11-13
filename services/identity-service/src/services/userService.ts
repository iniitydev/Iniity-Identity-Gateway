import { User } from '../models/User';

// This is a mock database/data store for demonstration purposes.
const users: User[] = [];

/**
 * Finds a user by their ID.
 * @param id The ID of the user to find.
 * @returns The user object or undefined if not found.
 */
export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

/**
 * Creates a new user.
 * @param userData The data for the new user.
 * @returns The newly created user object.
 */
export const createUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    id: `user_${Date.now()}`,
    ...userData,
    createdAt: new Date(),
  };
  users.push(newUser);
  // In a real application, you would also trigger SCIM provisioning from here.
  console.log(`User created: ${newUser.id}. Triggering provisioning...`);
  return newUser;
};
