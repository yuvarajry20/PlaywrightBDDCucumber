import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pagefixture";
import HeaderPage from "../../pages/headerPage";

let headerPage: HeaderPage;

Then('user searches for item with name "{string}"', async function (itemName: string) {
  headerPage = new HeaderPage(pageFixture.page!);
  await headerPage.enterBookname(itemName);
  await pageFixture.logger?.info(`Searched for item: ${itemName}`);
});

When('user adds item to cart', async function () {
  await headerPage.addItemToCart();
  await pageFixture.logger?.info('Clicked on Add to Cart button');
});

Then('item should be added to cart "{string}"', async function (itemName: string) {
  await headerPage.openCart();
  await headerPage.validateItemInCart(itemName);
  await pageFixture.logger?.info(`Verified item "${itemName}" is in cart`);
});
