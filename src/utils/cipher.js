const crypto = require("crypto");

// Secret used to decrypt (also stored in code)
const decryptionPassword = "MY_SECRET_PASSWORD";

function decryptKey(encrypted, password) {
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Encrypted OpenAI key stored in code
const encryptedKey = "3737113203055b27a86043f4de1b7a7097a372b9fd050cb5926d84a03f12cbd7a63cd3e0fbb5d6e969c8b4a50ef3e540e2bd21312db277cdb2d0177e43889d14636266d6fd08327bc81392cc1dd33405c88cf6e3cebedb8bfe20da5d2dc2a91eda07aa41c81ba6150fd059b531a17f679b8f45e8e4ca11d5f078f8fb87bd41191afe1a32264ffab9460697f6f07980b3441167114b7638adc7cb29f61ec1cd56a4044c8e08a227a670fe05c0580afac2"

// Decrypt at runtime
export const restroAI = decryptKey(encryptedKey, decryptionPassword);
