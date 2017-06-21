const CarQSPage = require('./carPage.po.js');

describe('Car Question Set page - Integration Test', function () {
    let page,
        EC;

    const newsTitles = [
        'CAR INSURANCE GUIDES',
        'MOTORING NEWS',
        'YOU & YOUR CAR',
        'STREETWISE'
    ];

    beforeAll(() => {
        page = new CarQSPage();
        EC = protractor.ExpectedConditions;
        page.pageLoad('http://www.ci1-cms.gb.moneysupermarket.com/shop/car-insurance/questionset/#?step=highimpactquestions');
    });

    it('should display info icon text', () => {
        page.waitForVisibilityOf(page.carQSInfoIcon);
        browser.driver.actions()
            .doubleClick(page.carQSInfoIcon)
            .perform();
    });

    it('should display dropdown correct work', () => {
        page.waitForVisibilityOf(page.carQSLicenceDropdown);
        browser.driver.actions()
            .click(page.carQSLicenceDropdown)
            .sendKeys(protractor.Key.ARROW_DOWN)
            .sendKeys(protractor.Key.ARROW_DOWN)
            .sendKeys(protractor.Key.ENTER)
            .perform();
        expect(page.carQSLicenceDropdownOption.getText()).toEqual('1');
    });

    it('should display first title with border', () => {
        page.waitForVisibilityOf(page.carQSTitleText);
        browser.executeScript(`window.scrollTo(0, 0);`);
        browser.executeScript("arguments[0].setAttribute('style', arguments[1]);",
            page.carQSTitleText.getWebElement(), "color: Red; border: 2px solid red;");
    });

});