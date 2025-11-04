class TransferFundsPage {
  constructor(page) {
    this.page = page;
    this.transferFundsLink = this.page.locator("a[href='transfer.htm']");
    this.amountInput = this.page.locator("#amount");
    this.fromAccountDropdown = this.page.locator("#fromAccountId");
    this.toAccountDropdown = this.page.locator("#toAccountId");
    this.transferButton = this.page.locator("input[value='Transfer']");
    this.successMessage = this.page.locator(
      "div[id='showResult'] h1[class='title']"
    );
  }
  async transferFunds(amount, fromAccountId, toAccountId) {
    await this.transferFundsLink.click();
    await this.page.waitForLoadState("networkidle");

    await this.amountInput.fill(amount);
    await this.fromAccountDropdown.selectOption(fromAccountId);
    await this.toAccountDropdown.selectOption(toAccountId);
    await this.transferButton.click();
    await this.page.waitForLoadState("networkidle");
    const successText = await this.successMessage.textContent();
    console.log("Transfer Success Message:", successText);
    await this.page.screenshot({ path: "transferFunds.png" });
  }
}
module.exports = { TransferFundsPage };
