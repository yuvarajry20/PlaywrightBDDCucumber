import { Page, expect } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/Playwrightwrapper';
import { compileFunction } from 'vm';

export default class RegisterPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private elements = {
    registerTab: "//button[normalize-space()='Register']",

    firstNameInput: "input[formcontrolname='firstName']",
    lastNameInput: "input[formcontrolname='lastName']",
    userNameInput: "input[formcontrolname='userName']",
    passwordInput: "input[formcontrolname='password']",
    confirmPasswordInput: "input[formcontrolname='confirmPassword']",
    // genderRadio: (gender: string) => `//input[@value='${gender.toLowerCase()}']`,
    // gender: "//input[@value='Male']",
    registerSubmitButton: "//button[.//span[contains(text(),'Register')]]",
    snackBar: "simple-snack-bar"
  };

  async clickRegisterTab() {
    await this.base.waitAndClick(this.elements.registerTab);
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    confirmPassword: string,
    gender: string
  ) {
    await this.page.locator(this.elements.firstNameInput).fill(firstName);
    await this.page.locator(this.elements.lastNameInput).fill(lastName);
    await this.page.locator(this.elements.userNameInput).fill(userName);
    await this.page.locator(this.elements.passwordInput).fill(password);
    await this.page.locator(this.elements.confirmPasswordInput).fill(confirmPassword);
    // await this.page.locator(this.elements.gender).fill(gender);
    // await this.page.locator(this.elements.genderRadio(gender)).click();
     const fullGender = gender.toLowerCase() === 'f' ? 'Female' : 'Male';
    const genderRadioXpath = `//input[@value='${fullGender}']`;
    await this.page.locator(genderRadioXpath).check();
  }
  async clickRegisterSubmit() {
    await this.base.waitAndClick(this.elements.registerSubmitButton);
  }
  async verifyRegisterSuccess() {
    const toast = this.page.locator(this.elements.snackBar);
    await expect(toast).toBeVisible({ timeout: 5000 });
    await expect(toast).toHaveText(/Registration successful/);
  }
}
