// retrieve personal details
// shift the downloaded csv doc into required dir(on precess)
// scrape csv file 
const fs = require('fs') 
const cheerio = require('cheerio');

var textByLine = fs.readFileSync('919010000738688.csv').toString().split('\n')   
const noop = () => {};

async function parse() {
    var personal_details = {}
    var $ = cheerio.load(fs.readFileSync('PersonalDetails.html'));
    var date = $('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(6) > div > div').text()
    personal_details["pidata"]={
        Account_Holder_Name:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(7) > div > div').text(),
        Account_Type:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(3) > div > div').text(),
        Currency:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(4) > div > div').text(),
        Date_Of_Opening:date.slice(7)+"-"+date.slice(3,6)+"-"+date.slice(0,2),
        IFSC_Code:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(9) > div > div').text(),
        Status:$('body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-homepage > div > div > mat-sidenav-container > mat-sidenav-content > div.innerContheight.ng-tns-c6-0 > section > app-s2000 > div > div > div.tabs.accounttabs.m-b-none > div > app-account-details > div > div > div:nth-child(1) > div.vertical-divider-accountDetails > app-hdr-list-link > div:nth-child(14) > div > div').text(),
    }
    console.log(personal_details)
    fs.appendFile("output.txt",String(personal_details),noop)
}
parse()

var trans = []

var j =10
while (textByLine[j]!=0) {
    var heading = textByLine[j].split(',')
    trans.push([heading[0].slice(6)+"-"+heading[0].slice(3,5)+"-"+heading[0].slice(0,2),heading[2].trim(),"(-)"+heading[3].trim(),"(+)"+heading[4].trim(),heading[5].trim()])
    fs.appendFile("output.txt",String(heading[0]+", "+heading[2]+", (-)"+heading[3]+", (+)"+heading[4]+", "+heading[5])+"\n" , noop);    
    j++
}
console.log(trans)

