class OpenAccountPage {
    constructor(page) {
        this.page = page;
        this.newAccountlink = page.locator("a[href='openaccount.htm']");
        this.accountTypeDropdown = page.locator('#type');
        this.openNewAccountButton = page.locator("input[value='Open New Account']");
        this.newAccountId = page.locator('#newAccountId');
    }
    async openNewAccount(accountType) {
        await this.newAccountlink.click();
        await this.page.waitForLoadState('networkidle');

        await this.accountTypeDropdown.selectOption(accountType);
        await this.openNewAccountButton.click();
        await this.page.waitForLoadState('networkidle');

        const accountId = await this.newAccountId.textContent();
        console.log('New Account ID:', accountId);
        await this.page.screenshot({ path: 'newAccountOpened.png' });   
    }
}

module.exports = { OpenAccountPage };
