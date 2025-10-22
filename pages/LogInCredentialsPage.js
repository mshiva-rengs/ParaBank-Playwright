class LoginInCredentialsPage {
    constructor(page) {
      this.page = page;
      this.usernameField = page.locator("input[name='username']");
      this.passwordField = page.locator("input[name='password']");
      this.loginButton = page.locator("input[value='Log In']");
    }
  
    async login(username, password) {
      await this.usernameField.fill(username);
      await this.passwordField.fill(password);
      await this.loginButton.click();
    }
  }
  
  module.exports = { LoginInCredentialsPage }; 