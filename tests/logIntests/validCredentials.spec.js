const { test, expect } = require('@playwright/test');
const { LoginInCredentialsPage } = require('../../pages/LogInCredentialsPage');

test('Sign Into my Online  Banking Profile', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await expect(page).toHaveTitle(/ParaBank | Welcome | Online Banking/);


  const loginPage = new LoginInCredentialsPage(page);
  await loginPage.login('Mingas', 'Tshepo@2010');
  await expect(page).toHaveTitle(/ParaBank | Accounts Overview/);


})
test('Sign Into my Online  Banking using Invalid password', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await expect(page).toHaveTitle(/ParaBank | Welcome | Online Banking/);


  const loginPage = new LoginInCredentialsPage(page);
  await loginPage.login('Mingas', 'Tshepo@201');
  await expect(page).toHaveTitle(/ParaBank | Accounts Overview/);


});