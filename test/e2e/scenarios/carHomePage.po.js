'use strict';

module.exports = class CarHomePage {

    constructor() {
        this.signInLink = element(by.css('.header__sign-in-nav-button--username'));
        this.emailInput = element(by.css('[data-ng-model="signInData.email"]'));
        this.passwordInput = element(by.css('[data-ng-model="signInData.password"]'));
        this.signInButton = element(by.xpath('.//*[@id="signInForm"]/div/div[4]/button'));
        this.userNameLink = element(by.linkText('Hi Active'));
        this.recentQuotes = element(by.id("btn_see_all_your_results"));
        this.logoBrands = element(by.css('.result-table--left-group'));
        this.goToSiteButton = element(by.id('mobile-redirect-a'));
        this.signOutLink = element(by.css("[class='header__sign-in-nav-button--sign-out-link']"));
        this.notYouLink = element(by.css("[class='header__sign-in-nav-button--recognized-not-you']"));
        this.activeQuotesTable = element(by.css('.active-insurance'));
        this.seeResultsButton = element(by.id('btn_see_all_your_results'));
        this.naturalLanguageSection = element(by.className('natural-language-panel__greeting'));
        this.updateButton = element(by.buttonText('Update results'));
        this.moreButton = element.all(by.partialButtonText('More'));
        this.goToSiteButton = element(by.id('mobile-redirect-a'));
    }
};