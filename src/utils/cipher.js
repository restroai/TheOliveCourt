const CryptoJS = require("crypto-js");

// Encrypt
const encrypted = "U2FsdGVkX1+cpZID6TbQh1xkPFHPhbB95TfCwlaWY+M5cPi4ANqWHz26rIyaksGvohe09MAOqLpLa2gz/JJKMLipwqSTSu+zlwHWcbD/33kfywP/8yu9cTHKcxsuSVK7bUP6uBhwHl3CClJLHgG4PTIl1eBQqwzFOPSYH+mUfBFMgF22BoSXa4QNHDSe9BMVtCrV6ZHrE5NJG7Nt0AG6+eL5auW1pjbJ48ifj7Cool/Bw3fyxfJmKpOZnHH+NJ/b"

// Decrypt
const bytes = CryptoJS.AES.decrypt(encrypted, "password");
const restroAI = bytes.toString(CryptoJS.enc.Utf8);
console.log("Decrypted:", restroAI);
module.exports = { restroAI };