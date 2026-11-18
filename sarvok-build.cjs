const fs=require('fs'),path=require('path'),zlib=require('zlib');
const base=path.resolve(__dirname,'sarvok');fs.mkdirSync(base,{recursive:true});
for(const entry of JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(__dirname,'sarvok-source.json.gz'))))){const target=path.resolve(base,entry.path);if(!target.startsWith(base+path.sep))throw Error('Invalid archive path');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,Buffer.from(entry.data,'base64'));}
// Keep SEO changes readable rather than modifying the binary source archive.
const overrides=path.join(__dirname,'sarvok-overrides');
for(const file of ['cms.js','worker.js','test.mjs','seo-test.mjs']){
  fs.copyFileSync(path.join(overrides,file),path.join(base,file));
}
fs.copyFileSync(path.join(overrides,'catalog.js'),path.join(base,'public','catalog.js'));
const configPath=path.join(base,'wrangler.jsonc');
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
config.assets.run_worker_first=[...new Set([...config.assets.run_worker_first,'/collection','/collection/'])];
fs.writeFileSync(configPath,JSON.stringify(config,null,2)+'\n');
const packagePath=path.join(base,'package.json');
const pkg=JSON.parse(fs.readFileSync(packagePath,'utf8'));
pkg.scripts.test='node --test test.mjs seo-test.mjs';
fs.writeFileSync(packagePath,JSON.stringify(pkg,null,2)+'\n');
console.log('Sarvok source and SEO overrides extracted.');
