import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';


Given('user navigates to the application', async function () {
  const baseUrl = process.env.BASEURL;
  if (!baseUrl) {
    throw new Error('BASEURL is not defined in the environment variables.');
  }
  await pageFixture.page?.goto(baseUrl);
});
Given('user click on the login link', async function () {
           await pageFixture.page?.locator('//span[contains(text()," Login ")]').click();
         });
Given('user enters username as {string}', async function (username) {
           await pageFixture.page?.locator('input[formcontrolname="username"]').fill(username);
         });
Given('user enters password as {string}', async function (password) {
           await pageFixture.page?.locator('input[formcontrolname="password"]').fill(password);
         });
When('user clicks on the login button', async function () {
           await pageFixture.page?.locator('(//span[contains(text(),"Login")])[2]').click();
         });
Then('Login should be successful', async function () {
  const userLabel = pageFixture.page!.locator("//span[contains(text(),'yuvaraj2004')]");
  await expect(userLabel).toBeVisible({ timeout: 5000 });
  await expect(userLabel).toHaveText(/yuvaraj2004/, { timeout: 5000 }); 
});
 Then('Login should Fail', async function () {

         });