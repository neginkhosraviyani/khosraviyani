# نگین خسرویانی و فروشگاه سروک

- [سایت اصلی](https://khosraviyani.ir/) — منبع در شاخه `main`، ساخته‌شده با Astro و منتشرشده روی Cloudflare.
- [فروشگاه سروک](https://shop.khosraviyani.ir/) — منبع در شاخه `sarvok-shop`، Worker و دیتابیس D1.
- [پنل مدیریت فروشگاه](https://shop.khosraviyani.ir/admin/)

## راهنمای ویرایش و انتشار

**[راهنمای کامل فارسی مدیریت سایت‌ها، CMS، مقالات دوزبانه، تصاویر و سئو](CMS-GUIDE.fa.md)**

راهنما توضیح می‌دهد کدام تغییر از پنل انجام می‌شود و کدام فایل باید در GitHub ویرایش شود. پورتفولیو فعلاً CMS تصویری ندارد. نوشته‌های فارسی و انگلیسی بلاگ در فایل‌های جدا هستند.

## توسعه پورتفولیو

در شاخه `main`:
```sh
npm ci
npm run dev
npm run build
npm run preview
```
آلبوم‌ها در `src/content/<section>/<album>/page.json` و فایل‌های رسانه در پوشه `media/` کنار آن هستند. مقاله‌ها در `blog-restored.json` و `blog-english.json` هستند. خروجی build در `dist/` است.

## توسعه فروشگاه

شاخه `sarvok-shop` را باز کنید و راهنمای بالا را بخوانید. فایل‌های پایدار تغییرات فروشگاه در `sarvok-overrides/` قرار دارند. داده‌های CMS در D1 هستند و با commit گیت‌هاب ذخیره یا بازیابی نمی‌شوند.

کد اولیه پورتفولیو از [MorrisGlr/creative](https://github.com/MorrisGlr/creative) با مجوز MIT منشعب شده است؛ حقوق محتوای هنری طبق LICENSE-CONTENT است.
