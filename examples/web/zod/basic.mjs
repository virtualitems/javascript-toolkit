import * as z from '/node_modules/zod/lib/index.mjs';

const User = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  avatar: z.string().url(),
}).strict();

fetch('https://reqres.in/api/users/12')
  .then(response => response.json())
  .then(json => User.parse(json.data))
  .then(user => console.log(user));
