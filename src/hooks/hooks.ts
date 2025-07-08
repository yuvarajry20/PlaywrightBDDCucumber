import { Browser, BrowserContext, chromium } from 'playwright';
import { After, AfterAll, Before, BeforeAll,Status } from '@cucumber/cucumber';
import { pageFixture } from './pagefixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});
Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});
After(async function ({pickle, result}) {
    console.log(result?.status);
    if (result?.status == Status.FAILED) {
        const img= await pageFixture.page?.screenshot({path: `./test-results/screenshots/${pickle.name}.png`,type: 'png'})
        if (img) {
      await this.attach(img, 'image/png');
    }
    await pageFixture.page?.close();
    await context.close();
    }
});
AfterAll(async function () {
  await browser.close();
});
