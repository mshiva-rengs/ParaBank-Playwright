const {test, expect} = require('@playwright/test');
const { BillPaymentPage } = require('../../pages/BillPaymentPage');
const { LoginInCredentialsPage } = require('../../pages/LogInCredentialsPage'); 

test.only('pay rent bill : R600.00', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);

    
    const loginPage = new LoginInCredentialsPage(page);
    await loginPage.login('Mingas', 'Tshepo@2010');
    await expect(page).toHaveTitle(/ParaBank | Accounts Overview/); 

    const billPaymentDetails = new BillPaymentPage(page);
    await billPaymentDetails.payBilldetails(
        'John Doe',
        '123 Rent St',
        'Johannesburg',
        'Gauteng',
        '2000',
        '0123456789',
        '15564',
        '15564',
        '600',
        
    );  
})