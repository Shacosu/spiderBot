const puppeteer = require("puppeteer");
module.exports = {
    getInfo: async () => {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                userDataDir: "../lib/userDateDir"
            })
            const page = await browser.newPage();
        
            await page.goto("https://app.racional.cl/tabs/home");
            await page.waitForSelector("#main > app-tabs > app-racional-tabs > ion-tabs > div > ion-router-outlet > app-home > ion-content > div > div.desktop-home-center > div.investment-summary > div > div.investment-total-header > div.main-value > span.investment-amount")
            const currentInvestment = await page.$eval("#main > app-tabs > app-racional-tabs > ion-tabs > div > ion-router-outlet > app-home > ion-content > div > div.desktop-home-center > div.investment-summary > div > div.investment-total-header > div.main-value > span.investment-amount", (el) => el.textContent);
            const dailyInvestmentInfo = await page.$$eval(".daily-investment-returns > p", (el) => {
                let paragraph = el.map(p => p.textContent)
                return {
                    investInfo: paragraph[0].trim(),
                    isMarketOpen: paragraph[1].trim() !== "Mercado cerrado"
                }
            });
            await browser.close()
            return data = {
                currentPrice: currentInvestment,
                info: dailyInvestmentInfo
            }
        } catch (error) {
            console.log(error);
        }
    }
}