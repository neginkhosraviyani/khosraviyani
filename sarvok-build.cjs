const fs=require('fs'),path=require('path'),zlib=require('zlib');
const base=path.resolve(__dirname,'sarvok');fs.mkdirSync(base,{recursive:true});
for(const entry of JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(__dirname,'sarvok-source.json.gz'))))){const target=path.resolve(base,entry.path);if(!target.startsWith(base+path.sep))throw Error('Invalid archive path');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,Buffer.from(entry.data,'base64'));}
console.log('Sarvok source extracted.');
