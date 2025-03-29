import { Request, Response } from "express";
import { UserService } from "./user.service";
import { userSchema } from "./user.schema";
import { ZodError } from "zod";
import { UserDTO } from "./user.dto";

export const UserController = {
    async register(req: Request, res: Response) {
        try {
            const validatedData = userSchema.parse(req.body as UserDTO);
            const user = await UserService.registerUser(
                validatedData.name,
                validatedData.email,
                validatedData.password
            );
            res.success(user, "User registered successfully", 201);
        } catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                res.badRequest(validationErrors, 400);
            } else {
                res.error(error, 500);
            }
        }
    },

    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();

            res.success(users, "Users retrieved successfully", 200);
        } catch (error) {
            res.error(error, 500);
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const validatedData = userSchema.parse(req.body as UserDTO);
            const updatedUser = await UserService.updateUser(Number(id), validatedData);

            res.success(updatedUser, "User updated successfully", 200);
        } catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                res.badRequest(validationErrors, 400);
            } else {
                res.error(error, 500);
            }
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await UserService.deleteUser(Number(id));

            res.success(null, "User deleted successfully", 204);
        } catch (error) {
            res.error(error, 500);
        }
    },
};
