# -*- coding: utf-8 -*-
import csv
# from tracemalloc import stop
from bs4 import BeautifulSoup
from selenium import webdriver
import time,os,csv

def scrape():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    # options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get("https://retail.axisbank.co.in/wps/portal/rBanking/axisebanking/AxisRetailLogin/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOKNAzxMjIwNjLwsQp0MDBw9PUOd3HwdDQwMjIEKIoEKDHAARwNC-sP1o_ArMYIqwGNFQW6EQaajoiIAVNL82A!!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?_ga=2.125312266.1630612623.1649142164-399103437.1649142164")


    def retrieve(driver,count):
        with open('dumps/dump'+str(count)+'.html', 'w',encoding="utf-8") as file:
            file.write(driver.page_source)
            
    count=0
    driver.find_element_by_xpath('//*[@id="MPINOption"]').click()                               #select "MPIN OPTION"
    driver.find_element_by_xpath('//*[@id="FORM_CUSTID"]').send_keys(os.environ.get('AXIS_ID')) #enter axis_id
    driver.find_element_by_xpath('//*[@id="User_MPIN"]').send_keys(os.environ.get('AXIS_MPIN')) #enter axis_mpin
    driver.find_element_by_xpath('//*[@id="ABCustomLoginPortletFormSubmit"]').click()           #click on "LOGIN"
    time.sleep(8)
    retrieve(driver,count)
    print("Home page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="navList1"]').click()                                 #click on "ACCOUNTS"
    time.sleep(5)
    retrieve(driver,count)
    print("Account page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="mat-tab-label-0-4"]/div').click()                    #click on "Account Details"
    time.sleep(7)
    retrieve(driver,count)
    print("Account details page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="mat-tab-label-0-1"]/div').click()                    #click on "Statements"
    time.sleep(5)
    retrieve(driver,count)
    print("Statements page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="selectedValue"]/div/div[1]').click()                 #click on "select"
    time.sleep(5)
    retrieve(driver,count)
    print("Dropdown src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="1_0"]').click()                                      #click on "Detailed Statement"
    time.sleep(5)
    retrieve(driver,count)
    print("Detailed Statement src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="nextMonth2"]').click()                               #click on "Last 3-months"
    time.sleep(3)
    retrieve(driver,count)
    print("Last 3 months page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="topDownload"]/div/div[1]').click()                   #click on "select"
    driver.find_element_by_xpath('//*[@id="3_3"]/span').click()                                 #click on "CSV"
    driver.find_element_by_xpath('//*[@id="StatementInputFilter0"]').click()                    #click on "GO"
    time.sleep(3)
    retrieve(driver,count)
    print("csv statement page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="LOGOUT"]').click()                                   #click on "logout"
    time.sleep(0.5)
    retrieve(driver,count)
    print("Logout page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="popup_ok0"]').click()                                #click on "OK"
    print("Website closed")


def parse():
    file1 = open("output.txt","a+",encoding="utf-8")
    details=[]
    with open("dumps/dump3.html",'r') as ht:
        soup = BeautifulSoup(ht,'html.parser')
        balance="₹ "+ soup.find("div",class_="currBalVal").contents[0][4:]
        for i in soup.find_all("div",class_="content ng-star-inserted"):
            for j in i.find_all("div",class_="p-lr-10 text-14 fw-5 text-black blockVal ng-star-inserted"):
                details.append(j.get_text())
                
    personal_details={
        "Account_Holder_Name":details[6],
        "Account_Type":details[2],
        "Currency":details[3],
        "Date_of_Opening":details[5][7:]+"-"+details[5][3:6]+"-"+details[5][:2],
        "IFSC_Code":details[8],
        "Status":details[-1]
    }

    summary={
        "location":details[10],
        "accountPattern":details[2],
        "balance":balance,
        "micrcode":"",
        "iType":"bank",
        "account_type":details[2],
        "ifsc_code":details[8],
        "currency":details[3]
        
    }
    file1.writelines(str(personal_details))
    file1.write("\n\n")
    file1.writelines(str(summary))
    file1.write("\n\n")
    
    transaction=[]
    c=0
    with open("919010000738688.csv",'r') as csvfile:
        datareader = csv.reader(csvfile)
        for i in datareader:
            c+=1
            if c>10:
                if not i:
                    break
                elif len(((i[3]).strip())):
                    transaction.append([i[0],i[2],"(-)"+(i[3]).strip(),(i[5]).strip()])
                else:
                    transaction.append([i[0],i[2],"(+)"+(i[4]).strip(),(i[5]).strip()])
    file1.writelines(str(transaction))
    file1.close()

def main():
    start = time.time()
    scrape()
    parse()
    end = time.time()
    print("The time of execution of above program is :", end-start)
main()
# -*- coding: utf-8 -*-
import csv
from bs4 import BeautifulSoup
from selenium import webdriver
import time,os,csv,io

def scrape():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get("https://retail.axisbank.co.in/wps/portal/rBanking/axisebanking/AxisRetailLogin/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOKNAzxMjIwNjLwsQp0MDBw9PUOd3HwdDQwMjIEKIoEKDHAARwNC-sP1o_ArMYIqwGNFQW6EQaajoiIAVNL82A!!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?_ga=2.125312266.1630612623.1649142164-399103437.1649142164")


    def retrieve(driver,count):
        with io.open('dumps/dump'+str(count)+'.html', 'w') as file:
            file.write(driver.page_source)
            
    count=0
    driver.find_element_by_xpath('//*[@id="MPINOption"]').click()                               #select "MPIN OPTION"
    driver.find_element_by_xpath('//*[@id="FORM_CUSTID"]').send_keys(os.environ.get('CUSTOMERID')) #enter axis_id
    driver.find_element_by_xpath('//*[@id="User_MPIN"]').send_keys(os.environ.get('MPIN')) #enter axis_mpin
    driver.find_element_by_xpath('//*[@id="ABCustomLoginPortletFormSubmit"]').click()           #click on "LOGIN"
    time.sleep(6)
    retrieve(driver,count)#0
    print("Home page src retrieved")
    count+=1
    
    time.sleep(10)
    driver.find_element_by_xpath('//*[@id="navList1"]').click()                                 #click on "ACCOUNTS"
    time.sleep(3)
    retrieve(driver,count)#1
    print("Account page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="mat-tab-label-0-4"]/div').click()                    #click on "Account Details"
    time.sleep(3)
    retrieve(driver,count)#2
    print("Account details page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="mat-tab-label-0-1"]/div').click()                    #click on "Statements"
    time.sleep(3)
    retrieve(driver,count)#3
    print("Statements page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="selectedValue"]/div/div[1]').click()                 #click on "select"
    time.sleep(3)
    retrieve(driver,count)#4
    print("Dropdown src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="1_0"]').click()                                      #click on "Detailed Statement"
    time.sleep(3)
    retrieve(driver,count)
    print("Detailed Statement src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="nextMonth2"]').click()                               #click on "Last 3-months"
    time.sleep(3)
    retrieve(driver,count)
    print("Last 3 months page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="topDownload"]/div/div[1]').click()                   #click on "select"
    driver.find_element_by_xpath('//*[@id="3_3"]/span').click()                                 #click on "CSV"
    driver.find_element_by_xpath('//*[@id="StatementInputFilter0"]').click()                    #click on "GO"
    time.sleep(3)
    retrieve(driver,count)
    print("csv statement page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="LOGOUT"]').click()                                   #click on "logout"
    time.sleep(0.5)
    retrieve(driver,count)
    print("Logout page src retrieved")
    count+=1
    
    driver.find_element_by_xpath('//*[@id="popup_ok0"]').click()                                #click on "OK"
    print("Website closed")


def parse():
    file1 = open("output.txt","a+")
    details=[]
    with open("dumps/dump2.html",'r') as ht:
        soup = BeautifulSoup(ht,'html.parser')
        balance=str(soup.find("div",class_="currBalVal").contents[0][2:])
        for i in soup.find_all("div",class_="content ng-star-inserted"):
            for j in i.find_all("div",class_="p-lr-10 text-14 fw-5 text-black blockVal ng-star-inserted"):
                details.append(j.get_text())
                
        months={
        "Jan":"01",
        "Feb":"02",
        "Mar":"03",
        "Apr":"04",
        "May":"05",
        "Jun":"06",
        "Jul":"07",
        "Aug":"08",
        "Sep":"09",
        "Oct":"10",
        "Nov":"11",
        "Dec":"12"
    }
    personal_details={
        "Account_Holder_Name":details[6].encode('ascii'),
        "Account_Type":details[2].encode('ascii'),
        "Currency":details[3].encode('ascii'),
        "Date_of_Opening":(details[5][7:]+"-"+months[details[5][3:6]]+"-"+details[5][:2]).encode('ascii'),
        "IFSC_Code":details[8].encode('ascii'),
        "Status":details[-1].encode('ascii')
    }

    summary={
        "location":details[10].encode('ascii'),
        "accountPattern":details[2].encode('ascii'),
        "balance":"Rs:"+balance.encode('ascii'),
        "micrcode":"",
        "iType":"bank",
        "account_type":details[2].encode('ascii'),
        "ifsc_code":details[8].encode('ascii'),
        "currency":details[3].encode('ascii')
        
    }
    file1.writelines(str(personal_details))
    file1.write("\n\n")
    file1.writelines(str(summary))
    file1.write("\n\n")
    
    transaction=[]
    c=0
    # os.replace("/home/dilip/Downloads/919010000738688.csv",os.getcwd())
    with open("919010000738688.csv",'r') as csvfile:
        datareader = csv.reader(csvfile)
        for i in datareader:
            c+= 1
            if c>10:
                if not i:
                    break
                elif len(((i[3]).strip())):
                    date=i[0].split("-")
                    transaction.append([date[-1]+"-"+date[1]+"-"+date[0],i[2],"(-)"+(i[3]).strip(),(i[5]).strip()])
                else:
                    transaction.append([i[0],i[2],"(+)"+(i[4]).strip(),(i[5]).strip()])
    file1.writelines(str(transaction))
    file1.close()

def main():
    start = time.time()
    scrape()
    parse()
    
    # sourse = "home/dilip/Downloads/919010000738688.csv"
    # destination = os.getcwd() +"/"
    # os.replace(sourse,destination)
    
    end = time.time()
    print("The time of execution of above program is :", end-start)
main()
















