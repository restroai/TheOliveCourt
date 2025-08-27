const CryptoJS = require("crypto-js");

// Function to encrypt a message
// const ciphertext = CryptoJS.AES.encrypt("my message", "password").toString();

// Encrypt
const encrypted = "U2FsdGVkX19NrDS70i8u60JcTBsxezMjgnM9GC87tnS08hfU2k6/5lNLQSWq/MSbmb7hGRyUYKultUQ9Nk05j5pWzROUvcveWK8CXgw2eVLfDwEKYRc2NU3+e27b2psD1ezZLF8usBg3KxHvEv7AFbIP0aDQlW4RbIAdUB9bLL28t7LVrfBCn2kqAXt3yOUEsE21aK8Bo8yvhTHWeUlN04IJsCq1RheyOU4AejiD/tb7VesblRcIKI+RVoK5hYwC"

// Decrypt
const bytes = CryptoJS.AES.decrypt(encrypted, "password");
const restroAI = bytes.toString(CryptoJS.enc.Utf8);
console.log("Decrypted:", restroAI);
module.exports = { restroAI };