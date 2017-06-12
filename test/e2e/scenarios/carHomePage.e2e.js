// spec.js
const CarHomePage = require('./carHomePage.po.js');

describe('Car Home page - Integration Test', function() {
    let page,
        EC;

    beforeAll(function() {
        page = new CarHomePage();
        EC = protractor.ExpectedConditions;
        browser.get('http://www.ci1-cms.gb.moneysupermarket.com/car-insurance/');
    });

    it('should have possible to login and logout', () => {
        page.signInLink.click();
        page.emailInput.sendKeys('active@msm.com');
        page.passwordInput.sendKeys('pass1234');
        page.signInButton.click();
        expect(page.userNameLink.getText()).toBe('Hi Active');
        page.signOutLink.click();
        page.notYouLink.click();
    });

    it('should have possible to go to result page', () => {
        page.signInLink.click();
        page.emailInput.sendKeys('active@msm.com');
        page.passwordInput.sendKeys('pass1234');
        page.signInButton.click();
        expect(page.userNameLink.getText()).toBe('Hi Active');
        expect(page.signOutLink.isDisplayed()).toBe(true);
        browser.wait(EC.visibilityOf(page.activeQuotesTable), 5000);
        page.seeResultsButton.click();
        browser.wait(EC.visibilityOf(page.naturalLanguageSection), 5000);
        expect(page.updateButton.isPresent()).toBe(true);
        expect(page.updateButton.isDisplayed()).toBe(false);
        page.moreButton.get(0).click();
        page.goToSiteButton.click();
        browser.ignoreSynchronization = true;
        browser.getAllWindowHandles().then((windowHandles) => {
            expect(windowHandles.length).toBe(2);
            browser.switchTo().window(windowHandles[1]);
            browser.wait(EC.urlContains('go-to-site'), 5000);
            browser.switchTo().window(windowHandles[0]);
        });
        browser.ignoreSynchronization = false;
        browser.navigate().back();
        browser.wait(EC.urlContains('car-insurance/results'), 5000);
    });
});