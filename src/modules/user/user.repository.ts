import prisma from "../../database/prisma";
import { User } from "@prisma/client";

export const UserRepository = {
    async createUser(data: { name: string; email: string; password: string }) {
        return prisma.user.create({ data });
    },

    async getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    },

    async getAllUsers() {
        return prisma.user.findMany();
    },

    async updateUser(data: { id: number; name?: string; email?: string, password?: string }) {
        return prisma.user.update({ where: { id: data.id}, data });
    },

    async deleteUser(id: number) {
        return prisma.user.delete({ where: { id } });
    },
};
