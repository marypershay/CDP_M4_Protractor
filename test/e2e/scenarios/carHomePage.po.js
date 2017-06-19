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
        this.updateButton = element(by.css('[data-msm-interaction-id="updateResults"]'));
        this.moreButton = element.all(by.css('.result-table__button'));
        this.goToSiteButton = element(by.id('mobile-redirect-a'));
        this.newsSection = element(by.css('.aem-Grid.container.msm-collapsible-content-section'));
        this.newsSectionTitle = this.newsSection.all(by.css('.msm-collapsible-content-section__container-title'));
        this.paginationSection = element(by.css('.msm-collapsible-content-section-guides-paginator'));
        this.paginationPoints = this.paginationSection.all(by.css('.msm-collapsible-content-section-guides-paginator__items'));
        this.paginationPrevButton = this.paginationSection.element(by.css('.msm-collapsible-content-section-guides-paginator__nav--prev'));
        this.paginationNextButton = this.paginationSection.element(by.css('.msm-collapsible-content-section-guides-paginator__nav--next'));
    }

    pageLoad() {
        return  browser.get('http://www.ci1-cms.gb.moneysupermarket.com/car-insurance/');
    }

    waitForVisibilityOf(element, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut;
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element), timeoutMs,
            `Waiting for visibilityOf of ${element.locator()} failed`);
    }

    waitForInVisibilityOf(element, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut;
        return browser.wait(protractor.ExpectedConditions.invisibilityOf(element), timeoutMs,
            `Waiting for invisibilityOf of ${element.locator()} failed`);
    }

    scrollAndWaitAndClick(element, top, timeOut) {
        const timeOutMs = timeOut || browser.params.defaultTimeOut;
        return this.waitForVisibilityOf(element, 5000).then(() => {
            return element.getLocation().then((navDivLocation2) => {
                let currTop = navDivLocation2.y;
                const currLeft = navDivLocation2.x;
                currTop -= top || 400;
                return browser.executeScript(`window.scrollTo(${currLeft}, ${currTop});`);
            });
        }).then(() => {
            return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), timeOutMs,
                `Waiting for element to be clickable of ${element.locator()} failed`);
        }).then(() => {
            return element.click();
        });
    }

    setTextInputByValue(textInput, value, needToScroll) {
        return this.scrollAndWaitAndClick(textInput).then(() => {
            return textInput.clear();
        }).then(() => {
            return textInput.sendKeys(value);
        }).then(() => {
            return this.loseFocus(textInput);
        });
    }

    loseFocus(textInput) {
        return element.all(by.css('h2')).filter((el) => {
            return el.isDisplayed();
        }).first().click().then(() => {
            browser.ignoreSynchronization = false;
        }, () => {
            return textInput.sendKeys(protractor.Key.TAB).then(() => {
                browser.ignoreSynchronization = false;
            }, (err) => {
                const errMess = `Error trying to lose focus: ${err.toString()}. Stacktrace: ${err.stack.toString()}`;
                throw errMess;
            });
        });
    }

    waitForUrlContains(text, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut;
        return browser.wait(protractor.ExpectedConditions.urlContains(text), timeoutMs,
            `Waiting for URL contains ${text} failed`);
    }

    navigateBack() {
        return browser.navigate().back();
    }

    getCountTab() {
        return browser.getAllWindowHandles().then((windowsId) => {
            return windowsId.length;
        }, (err) =>{
            const errMess = `Error trying to getAllWindowHandles(): ${err.toString()}. Stacktrace: ${err.stack.toString()}`;
            throw errMess;
        });
    }

    switchToTab(number) {
        return browser.getAllWindowHandles().then((windowsId) => {
            return windowsId[number];
        }).then((tabId) => {
            return browser.switchTo().window(tabId);
        });
    }
};