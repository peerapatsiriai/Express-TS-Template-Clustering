import { UserRepository } from './user.repository';

export const UserService = {
  async registerUser(name: string, email: string, password: string) {
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) throw new Error('User already exists');

    return UserRepository.createUser({ name, email, password });
  },

  async getAllUsers() {
    return UserRepository.getAllUsers();
  },

  async updateUser(id: number, data: { name?: string; email?: string; password?: string }) {
    return UserRepository.updateUser({ id, ...data });
  },

  async deleteUser(id: number) {
    return UserRepository.deleteUser(id);
  },
};
