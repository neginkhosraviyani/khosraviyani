import assert from 'node:assert/strict';
import {withSEO, productDescription, guides, sitemap, productSchema} from './cms.js';
const product={id:1,slug:'example',name:'وست گل',color:'کرم',sizes:['40-42'],desc:'توضیح محصول',gallery:['/assets/example.png']};
const html=withSEO('<html><head><title>old</title></head></html>',{title:product.name,description:productDescription(product),path:'/product/example/',schema:[productSchema(product)]});
assert.match(html,/رنگ کرم/);
assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
assert.match(html,/max-image-preview:large/);
assert.match(html,/twitter:description/);
const ld=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(ld['@graph'][0].name,product.name);
assert.ok(!ld['@graph'][0].offers,'Do not imply an active online checkout');
assert.equal(guides.length,2);
for(const guide of guides){assert.ok(guide.body.length>500);assert.ok(sitemap([product],guides).includes('/blog/'+guide.slug+'/'));}
assert.match(sitemap([product],guides),/\/collection\//);
console.log('PASS: product metadata, JSON-LD, canonical uniqueness, guides and collection sitemap');
