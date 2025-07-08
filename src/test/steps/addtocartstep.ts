import { Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { pageFixture } from "../../hooks/pagefixture";


Then('user searches for item with name "{string}"', async function (itemName) {
           await pageFixture.page?.getByRole('combobox', { name: 'Search' }).fill(itemName);
           await pageFixture.page?.waitForTimeout(2000);
           await pageFixture.page?.getByRole('combobox', { name: 'Search' }).press('Enter');
         });
When('user adds item to cart', async function () {
           await pageFixture.page?.locator('(//span[@class="mdc-button__label"])[5]').click();
         });
Then('item should be added to cart "{string}"', async function (itemName) {
  await pageFixture.page?.locator("(//button[@class='mdc-icon-button mat-mdc-icon-button mat-unthemed mat-mdc-button-base ng-star-inserted'])[2]").click();

  const cartItem = await pageFixture.page?.locator(`//a[text()="${itemName}"]`).first().textContent();
  await expect(cartItem).toContain(itemName);
});

