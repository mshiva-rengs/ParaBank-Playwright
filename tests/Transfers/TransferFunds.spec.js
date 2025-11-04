const {test, expect} = require('@playwright/test');
const { TransferFundsPage } = require('../../pages/TransferFundsPage');
const { LoginInCredentialsPage } = require('../../pages/LogInCredentialsPage');


test.only('Transfer 100.00', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);

    const loginPage = new LoginInCredentialsPage(page);
    await loginPage.login('Mingas', 'Tshepo@2010');
    await expect(page).toHaveTitle(/ParaBank | Accounts Overview/);  

   const transferFundsDetails = new TransferFundsPage(page);
await transferFundsDetails.transferFunds('100', '147654', '178845');

}); 
