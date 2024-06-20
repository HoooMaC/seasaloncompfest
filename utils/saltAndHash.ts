import bcrypt from 'bcryptjs';

// const generateSaltIfNot = async () => {
//   if (!salt) {
//     salt = await bcrypt.genSalt(10);
//     console.log(`Function generate salt called ${salt}`);
//   }
//   return salt;
// };

export const saltAndHash = async (password: string, message?: string) => {
  const salt: string = 'secret';
  // const salt = await generateSaltIfNot();
  const hashedfskjf = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf} `);
  const hashedfskjf1 = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf1} `);
  const hashedfskjf2 = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf2} `);
  const hashedfskjf3 = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf3} `);
  const hashedfskjf4 = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf4} `);
  const hashedfskjf5 = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf5} `);
  const hashedfskjf6 = await bcrypt.hash(password, salt);
  if (message) console.log(`${message} : ${hashedfskjf6} `);
  return hashedfskjf6;
};
