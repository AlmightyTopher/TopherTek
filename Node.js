const crypto = require('crypto');
const fs = require('fs');

const secretKey = crypto.randomBytes(32); // Generate a strong encryption key
const algorithm = 'aes-256-cbc';
const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyM2VlYjU1YS1jYjkwLTRkZjMtYTgwZS02MzhkNDNhZTFmYzUiLCJ1c2VybmFtZSI6IlRvcGhlckd1dGJyb2QiLCJpYXQiOjE3MDY4NTExOTd9.4IUtNHPTQdtMWNAjiQR5KIuA48EnfxoCNbC9LtKYo5M"; // Replace this with your token

// Generate a random initialization vector
const iv = crypto.randomBytes(16);

// Encrypt the API token
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
let encrypted = cipher.update(apiToken, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Save encrypted data & key
fs.writeFileSync('config.enc', `${iv.toString('hex')}:${encrypted}`);
fs.writeFileSync('key.enc', secretKey.toString('hex')); // Save key separately

console.log("API token encrypted and saved successfully.");
