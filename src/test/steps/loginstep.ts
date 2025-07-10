import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pagefixture';
import LoginPage from '../../pages/loginPage';

let loginPage: LoginPage;

Given('user navigates to the application', { timeout: 20000 }, async function () {
  const baseUrl = process.env.BASEURL;
  if (!baseUrl) {
    throw new Error('BASEURL is not defined in the environment variables.');
  }
  await pageFixture.page?.goto(baseUrl);
  await pageFixture.logger?.info(`Navigated to ${baseUrl}`);
});

Given('user click on the login link', async function () {
  loginPage = new LoginPage(pageFixture.page!);
  await loginPage.clickLoginLink();
  await pageFixture.logger?.info('Clicked on the login link');
});

Given('user enters username as {string}',{ timeout: 20000 }, async function (username: string) {
  await loginPage.enterUsername(username);
  await pageFixture.logger?.info(`Entered username: ${username}`);
});

Given('user enters password as {string}', async function (password: string) {
  await loginPage.enterPassword(password);
  await pageFixture.logger?.info(`Entered password: ${password}`);
});

When('user clicks on the login button', async function () {
  await loginPage.clickLoginButton();
  await pageFixture.logger?.info('Clicked on the login button');
});

Then('Login should be successful', async function () {
  await loginPage.verifyLoginSuccessful();
  await pageFixture.logger?.info('Login was successful and user label is visible');
});

Then('Login should Fail', async function () {
  // You can assert failure element here if needed
  await pageFixture.logger?.info('Login failed as expected');
});
