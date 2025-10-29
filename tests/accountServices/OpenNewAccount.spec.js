const {test, expect} = require('@playwright/test');
const {OpenAccountPage} = require('../../pages/OpenAccountPage');
const { LoginInCredentialsPage } = require('../../pages/LogInCredentialsPage');


test.only('Open Savings Account', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);



    const loginPage = new LoginInCredentialsPage(page);
    await loginPage.login('Mingas', 'Tshepo@2010');
    await expect(page).toHaveTitle(/ParaBank | Accounts Overview/);     

    const OpenAccountDetails = new OpenAccountPage(page);
    await OpenAccountDetails.openNewAccount(
        'SAVINGS'
    );
});