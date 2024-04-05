import { z } from "zod";

// z.object({
//   name: z.string().min(3),
//   email: z.string().email(),
//   age: z.number(),
// });

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export default schema;
