import { userSchema, type User } from "../../../../shared/js/types.ts";

const _users: User[] = [
  {
    _id: "1",
    name: "Sue Barker",
    email: "sueb@gmail.com",
  },
  {
    _id: "2",
    name: "Freddy Smith",
    email: "freds123@gmail.com",
  },
  {
    _id: "3",
    name: "Mitch Chopsworth",
    email: "mitchmitch67@gmail.com",
  },
];

export const users = _users.map((user) => userSchema.parse(user));
