import { UserSchema, type User } from "../../../../shared/types/schemas.ts";

const _userCredentials: Omit<User, "createdAt" | "updatedAt">[] = [
  {
    _id: "1",
    name: "Sarah Miller",
    email: "sarahmiller@email.com",
    emailVerified: true,
    farmName: "Miller Show Pigs",
  },
  {
    _id: "2",
    name: "Freddy Smith",
    email: "freds123@gmail.com",
    emailVerified: false,
    farmName: "Green Acres Farm",
  },
  {
    _id: "3",
    name: "Mitch Chopsworth",
    email: "mitchmitch67@gmail.com",
    emailVerified: false,
    farmName: "Grandpa's Pigs",
  },
  {
    _id: "4",
    name: "Sue Barker",
    email: "sueb@gmail.com",
    emailVerified: false,
    farmName: "Wild West Farm",
  },
];

const _users: User[] = _userCredentials.map((user) => ({
  ...user,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const users = _users.map((user) => UserSchema.parse(user));
