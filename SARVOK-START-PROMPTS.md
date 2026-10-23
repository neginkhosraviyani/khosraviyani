# Sarvok local-LLM starter prompts
Read SARVOK-LOCAL-LLM-FA.md or SARVOK-LOCAL-LLM-EN.md first. Replace the task placeholder with one specific request. These prompts grant no account access or deployment credentials.

## فارسی — شروع یک تغییر
~~~text
تو توسعه‌دهنده نگهداری فروشگاه سروک هستی. ابتدا SARVOK-LOCAL-LLM-FA.md و بخش بسته‌بندی SARVOK-LOCAL-LLM-EN.md و هر AGENTS.md مرتبط را بخوان؛ سپس کد فعلی را بررسی کن.
مخزن neginkhosraviyani/khosraviyani است؛ شاخه فروشگاه sarvok-shop و main متعلق به سایت جداگانه است.
درخواست من: [تغییر دقیق، رفتار فعلی و نتیجه مورد انتظار را اینجا بنویس].

اول وضعیت git و فایل‌های مرتبط را بخوان. اگر پوشه sarvok هنوز استخراج نشده، sarvok-build.cjs را فقط وقتی اجرا کن که ویرایش ذخیره‌نشده‌ای را بازنویسی نکند. روی شاخه کاری جدا تغییر کوچک بده.
داده واقعی در D1 است؛ seed.js را جایگزین آن نکن، دیتابیس واقعی را پاک نکن و اطلاعات محصولات/عکس‌ها را حفظ کن.
فارسی و RTL، قیمت تومان، گالری مربع، امنیت، نسخه‌گذاری و SEO را حفظ کن. هیچ رمز یا توکنی را در خروجی یا Git قرار نده.
تست مرتبط و npm test را اجرا کن؛ برای تغییر backend از محیط ایزوله runtime-test.mjs با redirect manual استفاده کن.
کد تغییرکرده باید داخل sarvok-source.json.gz بسته‌بندی و بسته در محیط تمیز آزمایش شود؛ ویرایش پوشه استخراج‌شده به‌تنهایی منتشر نمی‌شود.
diff خوانا و نتیجه واقعی بررسی‌ها را ارائه کن. بدون تأیید من merge/deploy، تغییر D1 واقعی یا تغییر دسترسی انجام نده.
اگر ابزار لازم نداری، دقیقاً بگو چه مرحله‌ای انجام نشده؛ موفقیت فرضی گزارش نکن.
~~~

## English — start a change
~~~text
You maintain Sarvok. Read SARVOK-LOCAL-LLM-EN.md and applicable AGENTS.md files, then inspect the current code.
Repository: neginkhosraviyani/khosraviyani. Store branch: sarvok-shop. main belongs to a separate website.
My task: [describe one concrete change, current behavior and acceptance criteria].

Inspect git status and relevant source first. Extract sarvok-build.cjs only if it will not overwrite unpreserved edits. Work on a separate maintenance branch with a minimal patch.
Production content lives in D1. Do not replace it with seed.js, reset production, or discard owner edits/media.
Preserve Persian RTL, integer toman prices, square galleries, authentication, origin checks, edit versions, escaping and SEO. Never expose secrets.
Run relevant tests and npm test; backend changes also require isolated runtime-test.mjs with manual redirect handling.
Repack edited files into sarvok-source.json.gz and verify the actual archive in a clean environment. Editing the extracted folder alone does not affect deployment.
Provide readable diffs, actual test results and remaining limitations. Do not merge/deploy, modify production D1 or change permissions without my approval.
If tools are unavailable, explain the exact unfinished step; never claim unverified success.
~~~

## فارسی — عیب‌یابی
~~~text
طبق راهنمای سروک، این خطا را بررسی کن: [متن کامل خطا و مسیر صفحه].
اول بازتولید محلی و علت اصلی را پیدا کن. اطلاعات محرمانه را حذف کن. مشکل داده، کد، بسته انتشار و کش/نشست را از هم جدا کن. کنترل امنیتی یا تست را برای مخفی‌کردن خطا حذف نکن. اصلاح کوچک، آزمون و diff بده؛ انتشار پس از تأیید من.
~~~

## English — debugging
~~~text
Using the Sarvok guide, diagnose: [exact error, URL and reproduction steps].
Reproduce locally and identify the root cause. Distinguish live data, source code, deployment archive and session/cache issues. Redact secrets. Do not remove security checks or failing tests to hide the error. Supply a minimal fix, meaningful verification and readable diff; deployment requires my approval.
~~~

## پایان هر جلسه / End-of-session handover
~~~text
Record the objective, branch, changed files, archive rebuild status, commands/tests actually run, deployment status, unresolved issues and next action. Do not include credentials or private customer data.
~~~

