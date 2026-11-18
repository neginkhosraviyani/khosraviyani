import worker from './worker.js';import {DatabaseSync} from 'node:sqlite';import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const token='test-only-'+crypto.randomBytes(32).toString('hex');
const sqlite=new DatabaseSync(':memory:');
const db={prepare(sql){let args=[];const stmt={bind(...a){args=a.map(v=>Array.isArray(v)?new Uint8Array(v):v);return stmt;},async first(){return sqlite.prepare(sql).get(...args)||null;},async all(){return {results:sqlite.prepare(sql).all(...args)};},async run(){const r=sqlite.prepare(sql).run(...args);return {meta:{changes:r.changes}};}};return stmt;},async batch(statements){sqlite.exec('BEGIN');try{const results=[];for(const s of statements)results.push(await s.run());sqlite.exec('COMMIT');return results;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
const env={DB:db,SETUP_TOKEN_HASH:crypto.createHash('sha256').update(token).digest('hex'),ASSETS:{fetch:()=>new Response('static asset')}};
const mf={dispatchFetch:(url,options)=>worker.fetch(new Request(url,options),env),dispose:()=>sqlite.close()};
const origin='https://shop.example';let cookie='';
const request=(p,method='GET',body,headers={})=>mf.dispatchFetch(origin+p,{method,headers:{Origin:origin,...(cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json'}:{}),...headers},...(body?{body:typeof body==='string'?body:JSON.stringify(body)}:{})});
try{
 let r=await request('/api/products');assert.equal(r.status,200);let products=await r.json();assert.equal(products.length,3);assert.equal(products.find(p=>p.id===4).price,3500000);assert.equal((await request('/api/admin/products')).status,401);
 assert.equal((await request('/api/setup','POST',{password:'test-password-long',token:'wrong'})).status,403);
 r=await request('/api/setup','POST',{password:'test-password-long',token});assert.equal(r.status,200,await r.clone().text());cookie=r.headers.get('Set-Cookie').split(';')[0];
 assert.equal((await request('/api/setup','POST',{password:'another-test-password',token})).status,409);
 products=await (await request('/api/admin/products')).json();let sarv=products.find(p=>p.id===4);sarv.color='کرم تست';r=await request('/api/admin/products','POST',sarv);assert.equal(r.status,200);assert.equal((await request('/api/admin/products','POST',sarv)).status,409);
 assert.equal((await request('/api/admin/products','POST',sarv,{Origin:'https://evil.example'})).status,403);
 let p={...sarv,id:undefined,name:'محصول تست',slug:'test-item',status:'draft'};assert.equal((await request('/api/admin/products','POST',p)).status,200);assert.equal((await (await request('/api/products')).json()).length,3);
 const data=fs.readFileSync('public/assets/sarv-side.jpg');r=await mf.dispatchFetch(origin+'/api/admin/media',{method:'POST',headers:{Origin:origin,Cookie:cookie,'Content-Type':'image/jpeg'},body:data});assert.equal(r.status,200,await r.clone().text());const media=await r.json();r=await request(media.url);assert.equal(r.status,200);assert.equal((await r.arrayBuffer()).byteLength,data.length);
 r=await request('/product/sarv/');assert.equal(r.status,200);assert.match(await r.text(),/کرم تست/);

 assert.equal((await request('/admin/')).headers.get('X-Robots-Tag'),'noindex, nofollow');
 let seo=await (await request('/api/admin/settings')).json();assert.match(seo.sellerUrl,/EHZHR/);seo.title='سروک تست';assert.equal((await request('/api/admin/settings','POST',seo)).status,200);assert.equal((await request('/api/admin/settings','POST',seo)).status,409);
 let post={title:'راهنمای تست',slug:'test-guide',excerpt:'خلاصه تست',body:'## عنوان\n\nمتن <script>alert(1)</script>',status:'draft'};
 assert.equal((await request('/api/admin/posts','POST',post)).status,200);assert.equal((await request('/blog/test-guide/')).status,404);let xml=await (await request('/sitemap.xml')).text();assert.ok(!xml.includes('test-guide'));assert.ok(!xml.includes('test-item'));assert.match(xml,/image:loc/);
 post=(await (await request('/api/admin/posts')).json())[0];post.status='published';assert.equal((await request('/api/admin/posts','POST',post)).status,200);let page=await (await request('/blog/test-guide/')).text();assert.match(page,/&lt;script&gt;/);assert.match(page,/BlogPosting/);assert.match(await (await request('/sitemap.xml')).text(),/test-guide/);assert.equal((await request('/blog/test-guide/extra')).status,404);
 post=(await (await request('/api/admin/posts')).json())[0];post.slug='new-guide';assert.equal((await request('/api/admin/posts','POST',post)).status,200);assert.equal((await request('/blog/test-guide/')).status,301);
 let current=(await (await request('/api/admin/products')).json()).find(x=>x.id===4);current.slug='new-sarv';current.seoTitle='عنوان اختصاصی سروک';assert.equal((await request('/api/admin/products','POST',current)).status,200);assert.equal((await request('/product/sarv/')).status,301);assert.equal((await request('/product/new-sarv')).status,301);page=await (await request('/product/new-sarv/')).text();assert.match(page,/عنوان اختصاصی سروک/);assert.match(page,/rel="canonical"/);assert.match(page,/"@type":"Product"/);assert.doesNotMatch(page,/"offers"/);
 page=await (await request('/')).text();assert.match(page,/href="\/product\/new-sarv\/"/);assert.match(page,/سروک تست/);assert.match(await (await request('/robots.txt')).text(),/Sitemap:/);
 console.log('PASS: blog drafts/publication, XSS escaping, sitemap images, SEO settings/conflicts, SSR catalog, canonical redirects, product and article schema');

 let collection=await request('/collection/');assert.equal(collection.status,200);const collectionHTML=await collection.text();assert.match(collectionHTML,/ItemList/);assert.match(collectionHTML,/new-sarv/);assert.equal((await request('/collection')).status,301);
 for(const slug of ['vest-size-guide','garment-care-guide']){const guide=await request('/blog/'+slug+'/');assert.equal(guide.status,200);assert.match(await guide.text(),/BlogPosting/);}
 await request('/api/logout','POST');assert.equal((await request('/api/admin/products')).status,401);cookie='';r=await request('/api/login','POST',{password:'test-password-long'});assert.equal(r.status,200);
 console.log('PASS: seeded catalog, authentication, one-time setup, CSRF, edit conflict, drafts, media upload/read, product rendering, logout/login');
}finally{await mf.dispose();}





