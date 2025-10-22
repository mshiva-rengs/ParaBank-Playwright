const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../pages/RegistrationPage');

test('User Registration on ParaBank Application', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);

    const RegistrationDetails = new RegistrationPage(page);
    await RegistrationDetails.navigateToRegistration(
        'Mingas',
        'Makola',
        '123 Main St',
        'Johannesburg',
        'Gauteng',
        '2000',
        '0123456789',
        '123-45-6789',
        'Mingas',
        'Tshepo@2010',
        'Tshepo@2010',
    );

});
