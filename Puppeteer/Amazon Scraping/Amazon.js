const puppeteer = require('puppeteer')
const fs = require('fs/promises')  
const prompt = require("prompt-sync")({ sigint: true });
let count = 0

async function scrap(){
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
  });
    const page = await browser.newPage();
    // await page.setViewport({ width: 1600, height: 1000 })       //Resizing the windows
    await page.goto("https://www.amazon.in");                 //browse
    
    let email = "gokuldilip.official@gmail.com";
    let password = "#1989Amazon";

    // let email = prompt('Enter Required email ');
    // let password = prompt('Enter Required Password ');


    await page.waitForSelector('#nav-signin-tooltip > a > span');        //wait till selector loads
    await page.click('#nav-signin-tooltip > a > span')
    // await page.waitForXPath()
    await page.waitForSelector('#ap_email');        //wait till selector loads
    await page.type('#ap_email',email);             //select and enter the email
    await page.click('#continue');

    retrieve(page,0)
    console.log("Enter email page retrieved")
    
    await page.waitForSelector('#ap_password');     //wait till selector loads
    await page.type("#ap_password",password);       // select and enter the password    
    await page.click("#signInSubmit");              

    retrieve(page,1);
    console.log("Enter page page retrieved");

    // await page.waitFor(3000);
    await page.waitForSelector('#nav-orders');
    await page.click("#nav-orders");

    retrieve(page,2);
    console.log("Orders page retrieved");

    await page.waitForSelector('#a-autoid-1-announce');
    await page.click('#a-autoid-1-announce');

    retrieve(page,3);
    console.log("Filter option src retrieved");

    await page.click('#orderFilter_3');                 //select the sub-option "2021"
    
    retrieve(page,4);
    console.log("Sub-option '2021' src retrieved");

    

    // signout!
    await page.waitForNavigation();
    await browser.close()
    // await page.waitForSelector('#nav-link-accountList');
    // await page.hover('#nav-link-accountList');
    // await page.waitForNavigation();
    // await page.waitForSelector('#nav-item-signout > span');
    // await page.click('#nav-item-signout > span');
    console.log("Website Closed")
    
}
async function retrieve(page,num){
    await page.waitForNavigation();
    let html = await page.evaluate(() => document.body.innerHTML);
    await fs.writeFile(`dumps/dump${count}.html`,html)
    count++
}
scrap()
