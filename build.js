const fs = require('fs');
const path = require('path');

function parseEnv(src){
  const lines = src.split(/\r?\n/);
  const env = {};
  for(const line of lines){
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if(match){
      env[match[1]] = match[2];
    }
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
