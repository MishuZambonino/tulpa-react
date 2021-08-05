var EntitySchema = require("typeorm").EntitySchema;
export const user = {
  name: "user",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    full_name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    rol: {
      type: "varchar",
    },
  },
};
