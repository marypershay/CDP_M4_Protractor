'use strict';
const assert = require('assert'),
    webdriver = require('selenium-webdriver');

const Page = require('./page.po.js');

let page = new Page();
let browser = page.createDriver();

browser.get('http://www.ci1-cms.gb.moneysupermarket.com/car-insurance/');
browser.findElement(page.signInLink).click().then(() => {
    return browser.findElement(page.emailInput).sendKeys('active@msm.com');
}).then(() => {
    return browser.findElement(page.emailConfirmInput).sendKeys('1234567');
}).then(() => {
    browser.findElement(page.signInButton).click()
}).then(() => {
    return browser.sleep(5000);
}).then(() => {
    browser.findElement(page.userNameLink).getText()
        .then((userName) => {
            return assert.equal(userName, "Hi Active", "-Hi Active");
        });
}).then(() => {
    return browser.findElement(page.recentQuotes).click();
}).then(() => {
    return browser.findElements(page.logoBrands);
}).then((logoBrand) => {
    return logoBrand[1].click();
}).then(() => {
    browser.sleep(5000);
    return browser.findElement(page.goToSiteButton).click();
}).then(() => {
    return browser.getAllWindowHandles().then((windowHandles) => {
        assert.equal(windowHandles.length, 2, "Not equal");
        return browser.switchTo().window(windowHandles[0]);
    }).then(() => {
        return browser.navigate().back();
    })
});
browser.quit();