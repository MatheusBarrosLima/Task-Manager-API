import{describe, expect, test} from "vitest";
import { userServices } from "../services/userServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";

describe("test create user functions", () => {
    test("should create user", async() => {
        const user = {
            name: "Matheus",
            email:"email@email",
            password: "123",
        };
        const userCreated = await userServices.create(user, userRepositoryInMemory)
        expect(userCreated?.email).toEqual(user.email);
    });
})

