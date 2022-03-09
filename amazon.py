from selenium import webdriver
import time
# driver = webdriver.Chrome()
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
# options.add_argument('--headless')
driver = webdriver.Chrome(options=options)

driver.get("https://www.amazon.in/")
gmail="gokuldilip.official@gmail.com"
password="#1989Amazon"

driver.find_element_by_xpath('//*[@id="nav-signin-tooltip"]/a/span').click()
driver.find_element_by_xpath('//*[@id="ap_email"]').send_keys(gmail)
driver.find_element_by_xpath('//*[@id="continue"]').click()

driver.find_element_by_xpath('//*[@id="ap_password"]').send_keys(password)
driver.find_element_by_xpath('//*[@id="signInSubmit"]').click()
time.sleep(3)

# print(driver.page_source)
with open('html.txt', 'w',encoding="utf-8") as f:
    f.write(driver.page_source)
driver.find_element_by_xpath('//*[@id="nav-orders"]/span[1]').click() #click orders

#to select the time-period
driver.find_element_by_xpath('//*[@id="a-autoid-1-announce"]').click()
driver.find_element_by_xpath('//*[@id="orderFilter_3"]').click()

l=[]
i=2
while(1):
    try:
        driver.find_element_by_xpath('//*[@id="ordersContainer"]/div[{0}]'.format(i))
        q=driver.find_element_by_xpath('//*[@id="ordersContainer"]/div[{0}]'.format(i))
        l.append(q.text.split('\n'))
        i+=1
    except:
        break
# print(l)

with open('amazon_order_details.txt', 'w') as f:
    for i in range(len(l)-1):
        f.write(str(l[i])+'\n')
driver.find_element_by_xpath('//*[@id="nav-link-accountList"]').click()
driver.close()
