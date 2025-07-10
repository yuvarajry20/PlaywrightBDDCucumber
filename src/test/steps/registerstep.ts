import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pagefixture";
import RegisterPage from "../../pages/registerPage";
import { DataProvider, RegisterUser } from "../../helper/utility/dataProvider";

let registerPage: RegisterPage;

Given('user clicks on the Register button', async function () {
  registerPage = new RegisterPage(pageFixture.page!);
  await registerPage.clickRegisterTab();
});

Then('user provides the required fields',{ timeout: 20000 }, async function () {
    const users: RegisterUser[] = DataProvider.getRegisterUsersFromCSV();

    for (const user of users) {
        const uniqueUsername = `${user.userName}_${Date.now()}`;
        console.log(` Registering user: ${uniqueUsername}`);
        await registerPage.fillRegistrationForm(
          
            user.firstName,
            user.lastName,
            uniqueUsername,
            user.password,
            user.confirmPassword,
            user.gender ?? "m"
        );
        await pageFixture.page?.waitForTimeout(2000);
        await registerPage.clickRegisterSubmit();  
        await registerPage.verifyRegisterSuccess(); 
         await pageFixture.page?.waitForURL('**/login', { timeout: 10000 });
         await pageFixture.page?.goto('https://bookcart.azurewebsites.net/register');

    }

});

// When('user clicks the submit register button',{ timeout: 20000 }, async function () {
//   await registerPage.clickRegisterSubmit();
// });

// Then('register should be successful', async function () {
//   await registerPage.verifyRegisterSuccess();
// });
