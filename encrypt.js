
const crypto = require('crypto');
const fs = require('fs');

const secretKey = crypto.randomBytes(32); // Generate a strong encryption key
const algorithm = 'aes-256-cbc';
const apiToken = "YOUR_ACTUAL_API_TOKEN_HERE"; // Replace this with your real API token

// Generate a random initialization vector (IV)
const iv = crypto.randomBytes(16);

// Encrypt the API token
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
let encrypted = cipher.update(apiToken, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Save encrypted data & key
fs.writeFileSync('config.enc', `${iv.toString('hex')}:${encrypted}`);
fs.writeFileSync('key.enc', secretKey.toString('hex')); // Save key separately

console.log("✅ API token encrypted and saved successfully.");
