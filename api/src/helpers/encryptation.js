require('dotenv').config();
const crypto = require('crypto-js');

function decrypt(encryptedString) {
  const key = crypto.enc.Utf8.parse(process.env.SECRET_KEY);
  const bytes = crypto.AES.decrypt(encryptedString, key, {
    iv: key,
    mode: crypto.mode.CTR,
  });
  const desincrypted = bytes.toString(crypto.enc.Utf8);
  return desincrypted;
}

function encrypt(string) {
  const key = crypto.enc.Utf8.parse(process.env.SECRET_KEY);
  const bytes = crypto.AES.encrypt(string, key, {
    iv: key,
    mode: crypto.mode.CTR,
  });
  const encrypted = bytes.toString();
  return encrypted;
}

module.exports = { decrypt, encrypt };
