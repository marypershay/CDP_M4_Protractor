'use strict';

const assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

module.exports = class Page {

    constructor() {
        this.signInLink = webdriver.By.css('.header__sign-in-nav-button--username');
        this.emailInput = webdriver.By.css('[data-ng-model="signInData.email"]');
        this.emailConfirmInput = webdriver.By.css('[data-ng-model="signInData.password"]');
        this.signInButton = webdriver.By.className('continue-button');
        this.userNameLink = webdriver.By.css('a.header__sign-in-nav-button--user-name');
        this.recentQuotes = webdriver.By.id("btn_see_all_your_results");
        this.logoBrands = webdriver.By.css('.result-table--left-group');
        this.goToSiteButton = webdriver.By.id('mobile-redirect-a');
    }

    createDriver() {
        let driver = new webdriver.Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.manage().timeouts().setScriptTimeout(10000);
        return driver;
    }

};