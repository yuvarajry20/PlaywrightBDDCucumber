import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/Playwrightwrapper";

export default class HeaderPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private headerPageElements = {
    searchInputPlaceholder: "Search Books or Authors",
    addToCartButtonXPath: '(//span[@class="mdc-button__label"])[5]',
    cartButtonXPath: '(//button[@class="mdc-icon-button mat-mdc-icon-button mat-unthemed mat-mdc-button-base ng-star-inserted"])[2]',
    cartItemXPath: (itemName: string) => `//a[text()="${itemName}"]`
  };

  async enterBookname(bookName: string) {
    await this.page.getByPlaceholder(this.headerPageElements.searchInputPlaceholder).fill(bookName);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press('Enter');
  }

  async addItemToCart() {
    await this.base.waitAndClick(this.headerPageElements.addToCartButtonXPath);
  }

  async openCart() {
    await this.base.waitAndClick(this.headerPageElements.cartButtonXPath);
  }

  async validateItemInCart(itemName: string) {
    const cartItem = await this.page.locator(this.headerPageElements.cartItemXPath(itemName)).first().textContent();
    expect(cartItem).toContain(itemName);
  }
}
