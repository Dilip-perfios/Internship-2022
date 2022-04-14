require('dotenv').config()
const puppeteer = require('puppeteer')
const fs = require('fs/promises') 
const fse = require('fs-extra')


async function scrap(){
    var b = []
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    // await page.goto("https://www.axisbank.com/");

    // //click on login button
    // await page.waitForSelector("body > header > div.maroontheme > div.topMenu.personalHeader > div > div > div > div.whitebg.d-inline-block > div.loginSect > div");
    // await page.click('body > header > div.maroontheme > div.topMenu.personalHeader > div > div > div > div.whitebg.d-inline-block > div.loginSect > div');

    // //click on "LOGIN" link
    // await page.waitForSelector('body > header > div.maroontheme > div.topMe nu.personalHeader > div > div > div > div.whitebg.d-inline-block > div.loginSect > div > div > div:nth-child(2) > ul > li:nth-child(1) > div > a.hidden-xs');
    // await page.click('body > header > div.maroontheme > div.topMenu.personalHeader > div > div > div > div.whitebg.d-inline-block > div.loginSect > div > div > div:nth-child(2) > ul > li:nth-child(1) > div > a.hidden-xs');

    await page.goto("https://retail.axisbank.co.in/wps/portal/rBanking/axisebanking/AxisRetailLogin/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOKNAzxMjIwNjLwsQp0MDBw9PUOd3HwdDQwMjIEKIoEKDHAARwNC-sP1o_ArMYIqwGNFQW6EQaajoiIAVNL82A!!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?_ga=2.125312266.1630612623.1649142164-399103437.1649142164")
    //click on "mpin" for login
    await page.waitForSelector('#MPINOption');
    await page.click('#MPINOption');

    //Click on customerId textbox
    await page.waitForSelector('#FORM_CUSTID')
    await page.type('#FORM_CUSTID',process.env.CUSTOMERID)

    //click on "MPIN textbox"
    await page.waitForSelector('#User_MPIN');
    await page.type('#User_MPIN',process.env.MPIN)

    //click on "login" button
    await page.waitForSelector('#ABCustomLoginPortletFormSubmit')
    await page.click('#ABCustomLoginPortletFormSubmit')

    //click on "ACCOUNTS"
    await page.waitForSelector('#navList1');
    await page.click('#navList1');

    const [accounts] = await page.$x('//*[@id="navList1"]/div')
        if (accounts) {accounts.click()}
    
    
    //click on "Account Details"
    await page.waitForSelector('#mat-tab-label-0-4 > div')
    await page.click('#mat-tab-label-0-4 > div')

    // const [personal] = await page.$x('/html/body/app-root/mat-sidenav-container/mat-sidenav-content/div/app-homepage/div/div/mat-sidenav-container/mat-sidenav-content/div[2]/section/app-s2000/div/div/div[2]/div/app-account-details/div/div/div[1]');
        // if (personal) {personal.click()};
    
    await page.waitForXPath('/html/body/app-root/mat-sidenav-container/mat-sidenav-content/div/app-homepage/div/div/mat-sidenav-container/mat-sidenav-content/div[2]/section/app-s2000/div/div/div[2]/div/app-account-details/div/div/div[1]')
    retrieve(page)  //Retrrieve the PersonalDetails.html raw html 
            
    // click on "statements"
    await page.waitForSelector('#mat-tab-label-0-1 > div');
    await page.click('#mat-tab-label-0-1 > div');
        
    // //click on dropdown menu and select "detailed statement"
    await page.waitForSelector('#selectedValue > div > div.mat-select-arrow-wrapper > div');
    await page.click('#selectedValue > div > div.mat-select-arrow-wrapper > div');
    
    // await page.waitForSelector('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c33-12 > section > app-s2000 > div > div > app-new-best-action > div > div');
    // retrieve1(page)

    // //click on detailed statement
    // await page.waitForSelector('//*[@id="1_0"]');
    // await page.click('//*[@id="1_0"]');

    const [dropdown] = await page.$x('//*[@id="1_0"]');
        if (dropdown) {dropdown.click()};
    
    //selecting date "FROM"
    //click on calendar icon
    await page.waitForSelector('#state_fromdate');
    await page.click('#state_fromdate')

    //click on year
    await page.waitForSelector('#mat-datepicker-0 > mat-calendar-header > div > div > button.mat-calendar-period-button.mat-button > span');
    await page.click('#mat-datepicker-0 > mat-calendar-header > div > div > button.mat-calendar-period-button.mat-button > span')

    //click on 2021
    await page.waitForSelector('#mat-datepicker-0 > div > mat-multi-year-view > table > tbody > tr:nth-child(2) > td:nth-child(2) > div');
    await page.click('#mat-datepicker-0 > div > mat-multi-year-view > table > tbody > tr:nth-child(2) > td:nth-child(2) > div');

    //click on month-Apr
    await page.waitForSelector('#mat-datepicker-0 > div > mat-year-view > table > tbody > tr:nth-child(2) > td.mat-calendar-body-cell.mat-calendar-body-active.ng-star-inserted > div');
    await page.click('#mat-datepicker-0 > div > mat-year-view > table > tbody > tr:nth-child(2) > td.mat-calendar-body-cell.mat-calendar-body-active.ng-star-inserted > div');

    //click on Date-7th
    await page.waitForSelector('#mat-datepicker-0 > div > mat-month-view > table > tbody > tr:nth-child(2) > td:nth-child(4) > div');
    await page.click('#mat-datepicker-0 > div > mat-month-view > table > tbody > tr:nth-child(2) > td:nth-child(4) > div')

    //select date "TO"
    await page.waitForSelector("#state_todate");
    await page.click('#state_todate')

    //click on date 6th apr-2022
    // await page.waitForSelector("#mat-datepicker-1 > div > mat-month-view > table > tbody > tr:nth-child(2) > td.mat-calendar-body-cell.mat-calendar-body-active.ng-star-inserted > div");
    // await page.click('#mat-datepicker-1 > div > mat-month-view > table > tbody > tr:nth-child(2) > td.mat-calendar-body-cell.mat-calendar-body-active.ng-star-inserted > div')

    const [dates] = await page.$x('//*[@id="mat-datepicker-1"]/div/mat-month-view/table/tbody/tr[2]/td[4]/div');
        if (dates) {dates.click()};


    //click on "GO"
    const [GO] = await page.$x('//*[@id="go"]');
        if (GO) {GO.click()};
    
    //click on "SELECT"
    await page.waitForSelector('#topDownload > div > div.mat-select-value');
    await page.click('#topDownload > div > div.mat-select-value')
    
    //click on "CSV"
    const [dropdown2] = await page.$x('//*[@id="3_3"]');
    if (dropdown2) {dropdown2.click()};
    
    //click on "GO"
    // await page.waitForSelector('#StatementInputFilter0');
    // await page.click('#StatementInputFilter0');
    const [go] = await page.$x('//*[@id="StatementInputFilter0"]');
        if (go) {go.click()};

    
    //click on "LOGOUT"
    // await page.waitForSelector('#LOGOUT');
    // await page.click('#LOGOUT');

    // //click on "CONFORMATION OK"
    // await page.waitForSelector('#popup_ok0');
    // await page.click('#popup_ok0')


}

async function retrieve(page){
// let html = await page.evaluate(() => document.body.innerHTML);
var html = await page.content();
await fs.writeFile(`PersonalDetails.html`,html)
}
scrap();

