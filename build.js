const fs = require('fs');
const path = require('path');

function parseEnv(src){
  const env = {};
  const lines = src.split(/\r?\n/);
  for (let line of lines){
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

let env = {};
if(fs.existsSync('.env')){
  env = parseEnv(fs.readFileSync('.env','utf8'));
}

const config = {
  NEWS_API_URL: env.NEWS_API_URL || 'https://jsonplaceholder.typicode.com/posts?_limit=3',
  CONTACT_ENDPOINT: env.CONTACT_ENDPOINT || 'https://httpbin.org/post',
  CONTACT_EMAIL: env.CONTACT_EMAIL || 'info@ktlbd.com',
  RFQ_ENDPOINT: env.RFQ_ENDPOINT || 'https://httpbin.org/post',
  RFQ_EMAIL: env.RFQ_EMAIL || 'commercial@ktlbd.com'
};

const out = `window.CONFIG = ${JSON.stringify(config, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'scripts', 'config.js'), out);
console.log('Generated scripts/config.js');
