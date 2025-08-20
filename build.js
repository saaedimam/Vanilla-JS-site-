
const fs = require('fs');
const path = require('path');

// Default values (fallback)
const defaults = {
  NEWS_API_URL: 'https://jsonplaceholder.typicode.com/posts?_limit=3',
  CONTACT_ENDPOINT: 'https://httpbin.org/post',
  CONTACT_EMAIL: 'info@ktlbd.com',
  RFQ_ENDPOINT: 'https://httpbin.org/post',
  RFQ_EMAIL: 'commercial@ktlbd.com'
};

function parseEnv(content) {
  const config = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const equalIndex = trimmed.indexOf('=');
    if (equalIndex === -1) continue;
    
    const key = trimmed.substring(0, equalIndex).trim();
    let value = trimmed.substring(equalIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    config[key] = value;
  }
  
  return config;
}

// Read .env file if it exists, otherwise use defaults
let config = { ...defaults };

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envConfig = parseEnv(envContent);
    config = { ...defaults, ...envConfig };
    console.log('✓ Read .env file');
  } catch (err) {
    console.warn('⚠ Failed to read .env, using defaults:', err.message);
  }
} else {
  console.log('ℹ No .env file found, using defaults');
}

// Ensure scripts directory exists
const scriptsDir = path.join(__dirname, 'scripts');
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Generate config.js
const configContent = `window.CONFIG = ${JSON.stringify(config, null, 2)};`;
const configPath = path.join(scriptsDir, 'config.js');

fs.writeFileSync(configPath, configContent);
console.log('✓ Generated scripts/config.js');
console.log('Config:', config);
