require('dotenv').config()
const puppeteer = require('puppeteer')
const fs = require('fs/promises') 
const fse = require('fs-extra')
const fses = require('fs') 
const cheerio = require('cheerio');



async function scrap(){
    var b = []
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    
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
    // await page.click('#navList1');

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

    //click on "Last 3-months"
    await page.waitForSelector('#nextMonth2');
    const [mon] = await page.$x('//*[@id="nextMonth2"]');
    if (mon) {mon.click()}; 
    
    // //click on "SELECT"
    await page.waitForSelector('#topDownload > div > div.mat-select-value');
    await page.click('#topDownload > div > div.mat-select-value')
    
    // //click on "CSV"
    const [dropdown2] = await page.$x('//*[@id="3_3"]');
    if (dropdown2) {dropdown2.click()};
        
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', 
    downloadPath: process.cwd()+'/'})
    // //click on "GO"
    // const [GO] = await page.$x('//*[@id="go"]');
    //     if (GO) {GO.click()};

    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', 
    downloadPath: process.cwd()+'/'})
        
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
    var html = await page.content();
    await fs.writeFile(`PersonalDetails.html`,html)
}
// scrap();

//***axiscrape.js***

// retrieve personal details
// shift the downloaded csv doc into required dir(on precess)
// scrape csv file 


async function parse() {
    const noop = () => {};
    var personal_details = {}
    var $ = cheerio.load(fses.readFileSync('PersonalDetails.html'));
    var date = $('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(6) > div > div').text()
    personal_details["personalDetails"]={
        Account_Holder_Name:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(7) > div > div').text(),
        Account_Type:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(3) > div > div').text(),
        Currency:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(4) > div > div').text(),
        Date_Of_Opening:date.slice(7)+"-"+date.slice(3,6)+"-"+date.slice(0,2),
        IFSC_Code:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(9) > div > div').text(),
        Status:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(14) > div > div').text(),
    }
    // console.log(personal_details)
    fses.appendFile("output.txt",JSON.stringify(personal_details,null,2),noop)
    var summary = {}
    summary["summary"]={
        location:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(11) > div > div.p-lr-10.text-14.fw-5.text-black.blockVal.ng-star-inserted').text(),
        accountPattern:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(3) > div > div').text(),
        balance:$('#card0 > div > div.w-100percent.feild-one.non-input-field.ng-star-inserted > div').text(),
        micrcode:"",
        iType:"bank",
        account_type:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(3) > div > div').text(),
        ifsc_code:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(9) > div > div').text(),
        currency:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(4) > div > div').text(),
    }
    fses.appendFile("output.txt",JSON.stringify(summary,null,2),noop)
    console.log(summary)
    
    
    var trans = []
    
    let textByLine = fses.readFileSync('919010000738688.csv').toString().split('\n')   
    var j =10
    while (textByLine[j]!=0) {
        var heading = textByLine[j].split(',')
        trans.push([heading[0].slice(6)+"-"+heading[0].slice(3,5)+"-"+heading[0].slice(0,2),heading[2].trim(),"(-)"+heading[3].trim(),"(+)"+heading[4].trim(),heading[5].trim()])
        fses.appendFile("output.txt",String(heading[0]+", "+heading[2]+", (-)"+heading[3]+", (+)"+heading[4]+", "+heading[5])+"\n" , noop);    
        j++
    }
    // console.log(trans)
}

// parse()



async function main(){
    await console.time("Time to retrieve details from axis website:")
    await scrap()
    await parse()
    await console.timeEnd("Time to retrieve details from axis website:")
}
main()
