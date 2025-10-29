class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.regLink = page.locator('a[href*="register"]');
        this.firstnameField = page.locator("input[id='customer.firstName']");
        this.lastnameField = page.locator("input[id='customer.lastName']");
        this.addressField = page.locator("input[id='customer.address.street']");
        this.cityField = page.locator("input[id='customer.address.city']");
        this.stateField = page.locator("input[id='customer.address.state']");
        this.zipcodeField = page.locator("input[id='customer.address.zipCode']");
        this.phonenumField = page.locator("input[id='customer.phoneNumber']");
        this.ssnField = page.locator("input[id='customer.ssn']");
        this.usernameField = page.locator("input[id='customer.username']");
        this.passwordField = page.locator("input[id='customer.password']");
        this.repeatpasswField = page.locator("input[id='repeatedPassword']");
        this.regButton = page.locator("input[value='Register']");
    }

    async navigateToRegistration(fname, lname, address, cityf, statef, zipc, phonen, ssn, usern, passw, repeatpassw) 
    {

        await this.regLink.click();
        
        await this.page.waitForLoadState('networkidle');
        await this.page.screenshot({ path: 'registrationPage.png' });

        await this.firstnameField.fill(fname);
        await this.lastnameField.fill(lname);
        await this.addressField.fill(address);
        await this.cityField.fill(cityf);
        await this.stateField.fill(statef);
        await this.zipcodeField.fill(zipc);
        await this.phonenumField.fill(phonen);
        await this.ssnField.fill(ssn);
        await this.usernameField.fill(usern);
        await this.passwordField.fill(passw);
        await this.repeatpasswField.fill(repeatpassw);
        await this.regButton.click();

        await this.page.waitForLoadState('networkidle');
        await this.page.screenshot({ path: 'afterRegistration.png' });
    }
} module.exports = { RegistrationPage };