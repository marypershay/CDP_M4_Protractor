const CarHomePage = require('./carHomePage.po.js');

describe('Car Home page - Integration Test', function () {
    let page,
        EC;

    const newsTitles = [
        'CAR INSURANCE GUIDES',
        'MOTORING NEWS',
        'YOU & YOUR CAR',
        'STREETWISE'
    ];

    beforeAll(() => {
        page = new CarHomePage();
        EC = protractor.ExpectedConditions;
        page.pageLoad();
    });

    beforeEach(() => {
        page.scrollAndWaitAndClick(page.signInLink);
        page.setTextInputByValue(page.emailInput, 'active@msm.com');
        page.setTextInputByValue(page.passwordInput, 'pass1234');
        page.scrollAndWaitAndClick(page.signInButton);
        expect(page.userNameLink.getText()).toEqual('Hi Active');
    });

    afterEach(() => {
        page.scrollAndWaitAndClick(page.signOutLink);
        page.scrollAndWaitAndClick(page.notYouLink);
    });

    it('should have possible to go to result page', () => {
        page.waitForVisibilityOf(page.signOutLink);
        page.waitForVisibilityOf(page.activeQuotesTable);
        page.scrollAndWaitAndClick(page.seeResultsButton);
        page.waitForUrlContains('car-insurance/results', 5000);
        page.waitForVisibilityOf(page.naturalLanguageSection);
        page.waitForInVisibilityOf(page.updateButton);
        browser.sleep(10000)
        page.scrollAndWaitAndClick(page.moreButton.get(1));
        page.scrollAndWaitAndClick(page.goToSiteButton);
        browser.ignoreSynchronization = true;
        expect(page.getCountTab()).toBe(2);
        page.switchToTab(1);
        page.waitForUrlContains('go-to-site', 5000);
        page.switchToTab(0);
        browser.ignoreSynchronization = false;
        page.navigateBack();
        page.waitForUrlContains('car-insurance/results', 5000);
    });

    it('should display news section', () => {
        page.waitForVisibilityOf(page.newsSection);
        newsTitles.forEach((item, index) => {
            expect(page.newsSectionTitle.get(index).getText()).toEqual(item);
        })
    });

    it('should display 3 quotes on landing page', () => {
        page.waitForVisibilityOf(page.paginationSection);
        page.waitForVisibilityOf(page.paginationPrevButton);
        page.waitForVisibilityOf(page.paginationNextButton);
        expect(page.paginationPoints.count()).toBe(3);
    });

});