import { userSchema, type User } from "../../../../shared/types/schemas.ts";

const _users: User[] = [
  {
    _id: "1",
    name: "Sarah Miller",
    email: "sarahmiller@email.com",
    farmName: "Miller Show Pigs",
  },
  {
    _id: "2",
    name: "Freddy Smith",
    email: "freds123@gmail.com",
    farmName: "Green Acres Farm",
  },
  {
    _id: "3",
    name: "Mitch Chopsworth",
    email: "mitchmitch67@gmail.com",
    farmName: "Grandpa's Pigs",
  },
  {
    _id: "4",
    name: "Sue Barker",
    email: "sueb@gmail.com",
    farmName: "Wild West Farm",
  },
];

export const users = _users.map((user) => userSchema.parse(user));
