import { Browser, chromium } from 'playwright';
import { After, Before } from '@cucumber/cucumber';
import { pageFixture } from './pagefixture';

let browser: Browser;
Before(async function () {
  browser=await chromium.launch({headless: false});
  const page=await browser.newPage();
  pageFixture.page = page;
});

After(async function () {
    await pageFixture.page?.close();
    await browser.close();
});
