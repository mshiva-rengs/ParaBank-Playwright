class BillPaymentPage {
  constructor(page) {
    this.page = page;

    this.paylink = page.locator("a[href='billpay.htm']");
    this.pnameField = page.locator("input[name='payee.name']");
    this.PAddressField = page.locator("input[name='payee.address.street']");
    this.PcityField = page.locator("input[name='payee.address.city']");
    this.PstateField = page.locator("input[name='payee.address.state']");
    this.PzipCodeField = page.locator("input[name='payee.address.zipCode']");
    this.PphoneNumberField = page.locator("input[name='payee.phoneNumber']");
    this.AccountNumberField = page.locator("input[name='payee.accountNumber']");
    this.PverifyAccountField = page.locator("input[name='verifyAccount']");
    this.AmountField = page.locator("input[name='amount']");
    //page.locator("input[value='Send Payment']");
  }
  async payBilldetails( pname, PAddress, Pcity, Pstate, PzipCode, PphoneNumber, PAccountNumber, PverifyAccount, PAmount,
  ) {
    await this.paylink.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.screenshot({ path: "billPaymentPage.png" });

    await this.pnameField.fill(pname);
    await this.PAddressField.fill(PAddress);
    await this.PcityField.fill(Pcity);
    await this.PstateField.fill(Pstate);
    await this.PzipCodeField.fill(PzipCode);
    await this.PphoneNumberField.fill(PphoneNumber);
    await this.AccountNumberField.fill(PAccountNumber);
    await this.PverifyAccountField.fill(PverifyAccount);  
    await this.AmountField.fill(PAmount);
    await this.page.screenshot({ path: "billPaymentDetails.png" });

    await this.page.locator("input[value='Send Payment']").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.screenshot({ path: "billPaymentConfirmation.png" });  
    
  }
}
module.exports = { BillPaymentPage };
