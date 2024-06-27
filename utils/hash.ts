const rightRotate = (value: number, amount: number): number => {
  return (value >>> amount) | (value << (32 - amount));
};

const hashAlgorithm = (message: string): string => {
  const h0 = 0x6a09e667;
  const h1 = 0xbb67ae85;
  const h2 = 0x3c6ef372;
  const h3 = 0xa54ff53a;
  const h4 = 0x510e527f;
  const h5 = 0x9b05688c;
  const h6 = 0x1f83d9ab;
  const h7 = 0x5be0cd19;

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  const messageBytes = new TextEncoder().encode(message);
  const messageBits =
    Array.from(messageBytes, byte => byte.toString(2).padStart(8, '0')).join(
      ''
    ) + '1';
  const messageLengthBits = (messageBytes.length * 8)
    .toString(2)
    .padStart(64, '0');

  const paddingBitsLength = (512 - ((messageBits.length + 64) % 512)) % 512;
  const paddingBits = '0'.repeat(paddingBitsLength);

  const paddedMessageBits = messageBits + paddingBits + messageLengthBits;

  const chunks = [];
  for (let i = 0; i < paddedMessageBits.length; i += 512) {
    chunks.push(paddedMessageBits.slice(i, i + 512));
  }

  let a = h0,
    b = h1,
    c = h2,
    d = h3,
    e = h4,
    f = h5,
    g = h6,
    h = h7;

  for (const chunk of chunks) {
    const words = [];
    for (let i = 0; i < 16; i++) {
      words.push(parseInt(chunk.slice(i * 32, i * 32 + 32), 2));
    }
    for (let i = 16; i < 64; i++) {
      const s0: number =
        rightRotate(words[i - 15], 7) ^
        rightRotate(words[i - 15], 18) ^
        (words[i - 15] >>> 3);
      const s1: number =
        rightRotate(words[i - 2], 17) ^
        rightRotate(words[i - 2], 19) ^
        (words[i - 2] >>> 10);
      words.push((words[i - 16] + s0 + words[i - 7] + s1) >>> 0);
    }

    let aTemp = a,
      bTemp = b,
      cTemp = c,
      dTemp = d,
      eTemp = e,
      fTemp = f,
      gTemp = g,
      hTemp = h;

    for (let i = 0; i < 64; i++) {
      const S1 =
        rightRotate(eTemp, 6) ^ rightRotate(eTemp, 11) ^ rightRotate(eTemp, 25);
      const ch = (eTemp & fTemp) ^ (~eTemp & gTemp);
      const temp1 = (hTemp + S1 + ch + k[i] + words[i]) >>> 0;
      const S0 =
        rightRotate(aTemp, 2) ^ rightRotate(aTemp, 13) ^ rightRotate(aTemp, 22);
      const maj = (aTemp & bTemp) ^ (aTemp & cTemp) ^ (bTemp & cTemp);
      const temp2 = (S0 + maj) >>> 0;

      hTemp = gTemp;
      gTemp = fTemp;
      fTemp = eTemp;
      eTemp = (dTemp + temp1) >>> 0;
      dTemp = cTemp;
      cTemp = bTemp;
      bTemp = aTemp;
      aTemp = (temp1 + temp2) >>> 0;
    }

    a = (a + aTemp) >>> 0;
    b = (b + bTemp) >>> 0;
    c = (c + cTemp) >>> 0;
    d = (d + dTemp) >>> 0;
    e = (e + eTemp) >>> 0;
    f = (f + fTemp) >>> 0;
    g = (g + gTemp) >>> 0;
    h = (h + hTemp) >>> 0;
  }

  return [a, b, c, d, e, f, g, h]
    .map(x => x.toString(16).padStart(8, '0'))
    .join('');
};

const generateSalt = (length: number = 16): string => {
  let salt = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    salt += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return salt;
};

export const hashPassword = (password: string, salt: string): string => {
  return hashAlgorithm(password + salt);
};

interface HashedPassword {
  salt: string;
  hashedPassword: string;
}

const createHashedPassword = (password: string): HashedPassword => {
  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);
  return { salt, hashedPassword };
};

export const verifyPassword = (
  password: string,
  hashedPassword: string,
  salt: string
): boolean => {
  const hash = hashPassword(password, salt);
  return hash === hashedPassword;
};
