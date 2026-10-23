# Sarvok maintenance with a local LLM — English
Updated: 2026-10-23. This is a handover based on the inspected source, not a guarantee that production never changes. Read the Persian guide in SARVOK-LOCAL-LLM-FA.md and starter prompts in SARVOK-START-PROMPTS.md.

## 1. What you are maintaining
Sarvok (سروک / سروُک / SARVOK) is a Persian, right-to-left women's clothing catalog with a custom CMS. It is NOT WordPress, Shopify, React, or Next.js.
Public: https://shop.khosraviyani.ir/
Admin: https://shop.khosraviyani.ir/admin/
Blog: https://shop.khosraviyani.ir/blog/
Repository: https://github.com/neginkhosraviyani/khosraviyani
Store branch: sarvok-shop. The main branch is the separate original website; do not modify it for shop tasks.
Worker: sarvok-shop. Cloudflare D1 binding: DB; database name: sarvok-shop. Static asset binding: ASSETS.
Brand seller reference: https://www.digikala.com/seller/EHZHR/
Currency stored and displayed: integer TOMAN. Do not silently convert to rial.
GA4 measurement ID: G-XMSGEYHC6X (public identifier, not a secret).

## 2. Source of truth: read this before editing
The deployment branch packages code in sarvok-source.json.gz. sarvok-build.cjs extracts it to sarvok/. Cloudflare extracts this archive on every build.
Editing only the extracted folder and committing it is NOT sufficient: the build will overwrite it with the old archive!
Production content is in D1: current products, uploaded images, blog posts, settings, redirects, administrator and sessions. It is not all in GitHub.
seed.js is initial demo/bootstrap data. Editing it does not update existing production products and must not be used to overwrite production.
Old local outputs/sarvok-preview and outputs/sarvok are historical static previews.
The original workstation source is outputs/sarvok-cloudflare; its packager is work/package-shop.mjs, with an explicit file allowlist. Fresh clones should use the archive workflow below.
Do not copy private setup links, passwords, cookies, database exports, .dev.vars, API tokens, or .test-state into GitHub or model prompts.

## 3. Ordinary content changes need no LLM or deployment
Use /admin/ for name, integer price, color, sizes, description, photo order, SEO title/description/alt text, blog drafts/publication and brand settings.
The first gallery image is the primary image. Upload completion does not save the product: click Save afterward.
Sizes are separated by English or Persian commas. A single range such as 40–42 is one option; 40,42 creates two choices.
Gallery limit: 12 images. Product photos use square frames; use consistent 2000×2000 source images and preserve clothing details. The CMS prepares uploaded images for the web.
Slugs: lowercase Latin letters, digits and single hyphens; unique within the relevant content type. Changing an existing slug creates a redirect; verify the old URL afterward.
Blog text supports paragraphs and separate blocks starting with "## "; it is not a full Markdown/HTML editor. HTML is escaped.
A 409 save conflict means reload the latest version and reapply the intended edit. Do not remove version checking.
The admin product backup downloads product JSON, NOT photos, posts, settings, credentials or a full database backup.

## 4. Use Qwen safely and effectively
Use a trusted local coding model/runtime that supports your hardware. No particular Qwen size or quantization is required by this project. Use the runtime's official installation instructions and verify current model availability.
A chat-only model can propose patches; a local coding agent can apply patches and run commands. Model inference alone cannot deploy, browse your account or read files unless the host application supplies those tools.
Open a fresh clone in your local coding tool. Give it the English guide, the starter prompt, a single concrete request, relevant files and actual error output.
Ask it to inspect before editing, propose the smallest change, apply a reviewable diff and run relevant checks. Small models work better with one task and a few files than the entire archive or thousands of unrelated lines.
For context limits, maintain a short handover: objective, files changed, checks passed, unresolved issues and next action.
Keep auto-approval off for deployment, remote database changes, credentials, package upgrades and destructive commands. Local inference does not automatically make every editor plugin or network tool private; check its settings.

## 5. Fresh-clone development
Prerequisites: Git, Node.js 24 and npm. Inspect repository instructions and package-lock before changing versions. Wrangler is pinned to 4.150.0 in this snapshot.
PowerShell commands (run each line separately):
~~~powershell
git clone --branch sarvok-shop --single-branch https://github.com/neginkhosraviyani/khosraviyani.git sarvok-maintenance
cd sarvok-maintenance
git switch -c maintenance/my-change
node sarvok-build.cjs
cd sarvok
npm ci
npm test
npm run dev
~~~
Use the URL printed by Wrangler. Local development uses local D1; do not add --remote. Local initial products may differ from live edited products, which is expected.
Production authentication uses a Secure __Host- cookie. If local login does not work over plain HTTP, use an appropriate local HTTPS setup or the isolated runtime test; never weaken the production cookie.
The one-time setup requires a matching setup token hash and an empty admin table. Do not reuse a production setup link. The runtime test creates its own random test token. For interactive local setup, configure a new local-only token/hash using the source contract and never commit it.
Stop the development server with Ctrl+C before work that needs its port.

## 6. File map
- worker.js: request routing, D1 initialization, auth/session/rate limiting, validation, admin APIs, product HTML, security headers.
- cms.js: settings/posts migrations, SEO helpers, HTML escaping, SSR cards, blog text rendering, schemas, sitemap.
- templates.js: base home HTML, shared header/footer; product rendering extracts portions around main/footer, so preserve these markers.
- seed.js: initial catalog only, not live catalog.
- public/app.js: storefront interactions, gallery, quantity/size selection and cart UI.
- public/style.css: storefront, responsive layout, square photo rules.
- public/admin/index.html, admin.js, admin.css: CMS layout, API calls and editing behavior.
- public/analytics.js: GA4 initialization. cms.js includes the Google script; worker.js CSP permits its endpoints.
- public/assets/: bundled images. Uploaded media is served from /media/ and stored in D1, not this folder.
- wrangler.jsonc: Worker name, asset routing, DB binding, custom domain and compatibility date.
- test.mjs: automated checks; runtime-test.mjs: Miniflare runtime/integration checks.
- package.json and package-lock.json: pinned dependency installation.
Read the actual code before extending a route or schema; this map is a starting point.

## 7. Data and security contracts
Tables: products, admin, sessions, attempts, media; CMS adds posts, settings, redirects.
Products/posts store JSON plus IDs/slugs/versions. Settings is a single versioned row. Media contains binary image data.
Admin APIs include /api/admin/products, /api/admin/posts, /api/admin/settings, /api/admin/media. Public/session routes include /api/products, /api/session, /api/login, /api/logout, /api/setup. Inspect actual methods and payloads before use.
Preserve authentication, HttpOnly/Secure/SameSite cookies, origin checks on mutations, login throttling, password hashing, bounded input, prepared SQL, escaping, file-type/size validation and optimistic edit versions.
Do not concatenate untrusted input into SQL/HTML, allow arbitrary remote gallery URLs or expose admin/API pages to indexing.
Add new fields through the entire chain: validation → persistence → admin form → public rendering → tests. Make migrations additive and compatible with existing rows. Never DROP/reseed production to fix a schema problem.
Before remote schema work, obtain a private full D1 backup using Cloudflare's current supported export/recovery workflow and verify restore options. Code rollback does not roll back D1.

## 8. Testing before packaging
In the extracted sarvok directory:
~~~powershell
npm test
node runtime-test.mjs
~~~
runtime-test.mjs persists local data in .test-state. For repeat tests, move that exact folder to a uniquely named local backup if it exists, after resolving and checking its absolute location is inside this checkout. Do not delete arbitrary folders or production data. A fresh checkout avoids state collisions.
The runtime helper must retain redirect:'manual': otherwise 301 assertions can follow redirects to the live domain and misleadingly fail with 404.
If Windows prevents esbuild/workerd from starting, diagnose local process/file permissions; do not remove tests to make the build green.
Review relevant UI at mobile and desktop widths: Persian RTL, logo, square images, gallery thumbnails, prices/sizes, navigation, empty states and validation errors.
For auth/API changes test unauthorized access, bad origin, duplicate slugs, stale versions, drafts, upload limits and logout. For SEO changes test canonical URLs, 301s, XML, published-only entries and escaping.
Do not perform test purchases or synthetic content writes against production.

## 9. Rebuild the deployment archive
Back at repository root, save the following as sarvok-pack-local.cjs. It starts from the archive's manifest and refuses missing files. New source/assets must be deliberately added to extra. It does not recursively collect secrets or node_modules.
~~~javascript
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const root = path.resolve(__dirname, 'sarvok');
const archive = path.join(__dirname, 'sarvok-source.json.gz');
const original = JSON.parse(zlib.gunzipSync(fs.readFileSync(archive)));
const extra = []; // Explicit new relative paths only, e.g. public/new-feature.js
const names = [...new Set([...original.map(e => e.path), ...extra])];
const entries = names.map(name => {
  const full = path.resolve(root, name);
  if (!full.startsWith(root + path.sep)) throw Error('Unsafe path: ' + name);
  return {path: name, data: fs.readFileSync(full).toString('base64')};
});
const output = zlib.gzipSync(JSON.stringify(entries));
fs.writeFileSync(archive + '.tmp', output);
fs.renameSync(archive + '.tmp', archive);
console.log('Packed', entries.length, 'files');
~~~
Run:
~~~powershell
node sarvok-pack-local.cjs
~~~
Before extracting again, preserve your edited source diff/backup. Extraction overwrites files.
Verify the new archive by extracting it into a separate clean checkout/directory, then run npm ci, npm test and node runtime-test.mjs there. A passing test in your editor's folder alone does not prove the uploaded archive contains your changes.
For removed files, deliberately update the manifest and verify no imports depend on them; this simple helper intentionally fails rather than silently dropping a missing file.
Keep the extracted source diff for review because gzip binary diffs are not readable. A future conversion to normal tracked source is possible, but it requires changing the build workflow as a separate tested migration.

## 10. Review, publish and verify
Inspect git status and diffs. Stage explicit intended files only; never git add everything when local secrets or state may exist.
Commit on your maintenance branch and open a pull request targeting sarvok-shop, NOT main. Include the readable source diff, rationale and tests. If the repository branch is auto-deployed, merging triggers production.
Current Cloudflare build command:
~~~text
node sarvok-build.cjs && cd sarvok && npm ci && npm test && node runtime-test.mjs
~~~
Current deploy command:
~~~text
cd sarvok && npx wrangler deploy
~~~
These are deployment configuration, not commands to run casually on production. Use the existing Git-connected flow. Confirm its branch/build configuration in Cloudflare before merging.
Wait for successful build AND active deployment. Check the public changed page, a product, admin login, blog, sitemap and robots. Confirm existing product data/photos remain.
If deployment fails, inspect the first real error, not npm funding/install-script warnings. Never suppress failing assertions without diagnosing the mismatch.
For a code regression, use a known-good Worker version or revert the change in sarvok-shop. Confirm database compatibility first. Never restore a database casually: it can discard later owner edits.

## 11. SEO, analytics and known status
Keep the public canonical origin HTTPS shop.khosraviyani.ir, brand spelling سروک, meaningful titles/descriptions, image alt text and legitimate seller sameAs link.
Sitemap /sitemap.xml is dynamic and includes published products/posts and their images; robots.txt allows public pages and excludes admin/API. Preserve asset run_worker_first routing when adding dynamic paths.
No fake reviews, inventory or Product Offer schema: checkout is not active. No guarantee of rich results or search rank.
GA4 public-page tag is installed. Realtime was observed on 2026-10-20 receiving a Sarvok blog page_view; this is a dated check, not a permanent health guarantee. Avoid duplicate tags and exclude admin.
Search Console domain property khosraviyani.ir includes the shop subdomain. Sitemap was submitted 2026-10-20 but displayed Couldn't fetch. Direct sitemap and robots requests returned HTTP 200; sitemap had six URLs then. Google fetch/indexing success remains UNCONFIRMED. Low traffic does not cause Couldn't fetch.
Diagnose unresolved fetch errors through sitemap details, URL Inspection/live checks and relevant Cloudflare logs; do not disable security globally or assume a fake Googlebot user-agent proves Google access.

## 12. What is NOT implemented
Real order processing, payment gateway verification, stock management, shipping calculations and transactional notifications are not complete. Cart UI is not proof of a working checkout.
Marketing screens contain guidance/UTM tools, not email/SMS delivery or consent-list automation. Do not send campaigns without explicit approval.
Future payments need server-side price calculation, orders, inventory rules, currency conversion agreed with provider, secrets, callback verification, idempotency and failure/cancellation tests. Check the provider's current official requirements; never collect card details yourself.
Do not invent shipping/return/contact policies; ask the owner for actual business terms.

## 13. Troubleshooting and acceptance
Save appears ineffective: read the UI error, verify login, completed uploads, required fields, unique slug, version conflict and API response; refresh the public canonical URL. Do not patch seed.js to fix live content.
New code disappears: archive was not rebuilt or deployment branch/build is wrong.
404 instead of 301 in runtime tests: check manual redirect handling and existing test state.
Image missing: check gallery URL and /media/ response; product JSON backup alone does not contain image bytes.
Blog missing: confirm publication status and exact slug.
Analytics absent: check correct property, public-page tag, CSP, blockers and consent configuration; do not claim receipt from script presence alone.
Every completed task should report changed files, checks actually run, live publication status, rollback path and remaining limitations. If tools or credentials are unavailable, say exactly what remains instead of claiming deployment.

## 14. Official references for future verification
Cloudflare Workers: https://developers.cloudflare.com/workers/
D1: https://developers.cloudflare.com/d1/
Wrangler: https://developers.cloudflare.com/workers/wrangler/
Google sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
Qwen: https://github.com/QwenLM
Use official documentation matching the installed versions; commands and service requirements can change.

