import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/Playwrightwrapper";

export default class LoginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private elements = {
    loginLink: "//span[contains(text(),' Login ')]",
    usernameInput: "input[formcontrolname='username']",
    passwordInput: "input[formcontrolname='password']",
    loginButton: "(//span[contains(text(),'Login')])[2]",
    userLabel: "//span[contains(text(),'yuvaraj2004')]"
  };

  async clickLoginLink() {
    await this.base.waitAndClick(this.elements.loginLink);
  }

  async enterUsername(username: string) {
    await this.page.locator(this.elements.usernameInput).fill(username);
  }

  async enterPassword(password: string) {
    await this.page.locator(this.elements.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.base.waitAndClick(this.elements.loginButton);
  }

  async verifyLoginSuccessful() {
    const userLabel = this.page.locator(this.elements.userLabel);
    await expect(userLabel).toBeVisible({ timeout: 5000 });
    await expect(userLabel).toHaveText(/yuvaraj2004/, { timeout: 5000 });
  }
}
