<br>
<br>

# **Description:** Internship Project Diary -2022 

<hr/>



# **PROBLEM STATEMENT-** To find alternatives to selenium python approach for web scraping that can perform all the functionalities present and more(if available) and try to subdue the limitations/challenges currently present. Any tech stack to suit the purpose of developing an end to end bank script for navigation and data parsing. Data to be fetched - personal information available in bank site and transaction history and present it in the required format. 

<hr/>

## [17-02-2022 - Day 01]
<h1 align="center"><strong>Introduction To Web Scraping and Techniques used</h1>

* It is an automated task set-up to extract a required data from the internet.
* This automation can be performed using Selenium with python or puppeteer with javascript
* It is like we are building a robot to enter into a website (with or without using the login credentials) and retrieve the required contents from it.
* This acquired data can later be used for the required purpose.

---
## [21-02-2022 - Day 02]
<h1 align="center"><strong>Selenium With Python</h1>

* Selenium is a web-based automation tool.
* Selenium combines with python to create an API like structure to enable web scraping.
* These both together provide convenient API’s through web drivers like Chrome,firefox.
* Executed a simple Selenium based python code for better understanding,selenium.py
    * Read and Installed chrome driver.(chromedriver is an interface which selenium uses to access websites just like the way we use chrome)
    * Created a virtual environment.
    * Understood about “locating elements” and its types.(Resource: Selenium with Python)
    * Executed a simple selenium based python program
* Alternatives to selenium (cannot use proxies easily) are BeautiFulSoup (requires external help to parse or server request) and Scrappy (very fast,perfectly handles asynchronous loading,easy proxy handling).

    
* Git Repository
    * Resource: https://youtu.be/SWYqp7iY_Tc
    * Ran through some Basic commands.
    * Got an idea about staging area, local repository and remote repository.
    * Learnt about Git Ignore.
    * Branches in git,merging branches to master branch.
    * Created a remote repository.
    * How to clone,push and pull requests.


* Headless Browser
    * It is a regular web browser without a user interface.
    * Interaction to a headless Browser is done by writing scripts.
    * Widely used in web testing and web scraping.
    * With JS,headless browsers can be used for asynchronous loading,endless scrolling and browser fingerprinting.
    * Some popular headless browser libraries  are:
        * Selenium (python library, can be used in any web driver)
        * Playwright (node.js library,works on Chromium,Firefox,Webkit)
        * Puppeteer (node.js library, works on Chrome,Firefox)
        * Splash (js based)
---
## [22-02-2022 - Day 03]
<h1 align="center"><strong>Coding Task</h1

* I wrote a code to scrap python.org website and understood the basic workflow using (selenium python).
* I understood how to access any tag using the inspect section.

---
## [23-02-2022 - Day 04]
<h1 align="center"><strong>Workflow of Selenium</h1>

* Understood:
    * How to enter texts into respective fields.
    * How to render them into text form using selectors.
    * How to access the wanted link. 

---
## [25-02-2022 - Day 05]
<h1 align="center"><strong>Learning Phase</h1>

* Should learn how to store the data into a .html file. 
* How to get data from this .html file using beautiful soup,python.(parsing the data)
* Multiple .html files are to be created where each .html file must contain multiple page_soure code on every click.
* The purpose of storing these source codes is error handling.
* Since we are using headless chrome (chrome instance without showing the chrome tab) we may not know if any error is encountered.Therefore using these source codes present in the .html files we will tackle these errors using beautiful soup in python and cheerio using javascript

---
## [28-02-2022 - Day 06]
<h1 align="center"><strong>Amazon WebScraping</h1>

* I coded to scrap amazon.in (to login,enter into orders’ page,retrieve details and logout )and retrieved details using “element.text” to fetch the details.
* The details fetched was a paragraph,lines separated by “\n”,so I transformed the data and stored it into nested list (using selenium python).

---
## [01-03-2022 - Day 07]
<h1 align="center"><strong>Doubt Session</h1>

* Had faced some problems while scraping amazon.
* Couldn't retrieve details directly as required. 
* Implemented and understood what headless browser means practically. 

---
## [02-03-2022 - Day 08]
<h1 align="center"><strong>Beautiful Soup using Python
</h1>

* Went through a youtube video telling how to parse text using beautiful soup.
* Understood the key concept of traversal through the tags.

---
## [04-03-2022 - Day 09]
<h1 align="center"><strong>JavaScript Course</h1>

* Completed a 6 hour course on udemy.
* Understood the basic concepts of javascript such as:
    * Variables
    * Operators (comparison)
    * Functions/Subroutines
    * Objects & array
    * Member access
    * Callable objects
    * Memory Hoisting
    * Scope Access 
    * “THIS” keyword context & Prototypes
    * IF,for,For-in
    * DOM (Document Object Model)
    * Event Handlers

---
## [07-03-2022 - Day 10]
<h1 align="center"><strong>Doubt Session on JavaScript</h1>

* Faced some problem while executing js in vs code.
* Discussion about javascript.

---
## [08-03-2022 - Day 11]
<h1 align="center"><strong>Introduction to Puppeteer</h1>

* Puppeteer is a js library which provides API to access chrome (approximately like selenium).
* Did some research about puppeteer.
* Went through some youtube videos on puppeteer and written some codes to understand the basis of puppeteer using javascript.

---
## [10-03-2022 - Day 12]
<h1 align="center"><strong>Hands-on with Puppeteer</h1>

* Scraped a basic website to understand how to use css-selectors to select specific tags.
* Understood the basic coding and workflow of puppeteer.
* Setting up Node environment and installed puppeteer.
* Understood how to click,add text into text field,to redirect to different pages.
* Asynchronous functions in javascript.Use of “await”.


---
## [11-03-2022 - Day 13]
<h1 align="center"><strong>Scraping Amazon using Puppeteer</h1>

* Keeping in reference of a youtube video,scraped amazon
* Understood:
    * How to add src into .html files.
    * How to handle parameters in async functions and return.
    * How to enable headless mode in puppeteer and set window size.
    * How to use page.waitForSelector and page.waitForXpath, and the difference between them.
    * The Execution flow of js as it uses Stack to manage variables and functions
    * Understood the use of page.waitForNavigation()[used to make sure all the elements in the page is loaded].

---
## [14-03-2022 - Day 14]
<h1 align="center"><strong>Demonstration and Doubt Session</h1>

* Had a discussion about the code on scraping amazon.
* Was told to create series of dump.html files with respect to the clicks made on the browser.
* Was told to replace hardcoded dump.html file names with a global variable logic.
* Minuet changes in the code for better understanding and faster execution.
* Pushed the code into Github.

---
## [15/03/2022 - Day 15]
<h1 align="center"><strong>Introduction to Cheerio</h1>

* Cheerio is a js library used to parse .html files and retrieve the required information.
* Cheerio in js is similar as BeautifulSoup in python.


---
## [16/03/2022 - Day 16]
<h1 align="center"><strong>Basic Parsing using Cheerio</h1>

* Understood
    * How to use cheerio.
    * Hands-on coding.
    * How to Parse a basic html file using cheerio.


---
## [17/03/2022 - Day 17]
<h1 align="center"><strong>Doubt Session on Cheerio</h1>

* Talk on Cheerio.
* Had doubt on how to access particular tags through html and inspection.
* Had doubt on how to use .each() method with the tags


---
## [18/03/2022 - Day 18]
<h1 align="center"><strong>Parsing .html dump files of Amazon using Cheerio</h1>

* Coded a .js file to parse the .html file using cheerio.
* Understood the implementation of cheerio.
* Discussion on parsing

---
## [21/03/2022 - Day 19]
<h1 align="center"><strong>Code Optimization</h1>

* Added relevent comments for better understanding.
* tried to make the code more Generic.

---
## [22/03/2022 - Day 20]
<h1 align="center"><strong>About Github Wikis</h1>

* Github wiki is basically a descriptive .md file.
* It represents the moto and output of the project pushed.

---
## [23/03/2022 - Day 21]
<h1 align="center"><strong>About Protractor and Cypress</h1>

* Protractor is an end-to-end test framework for Angular and AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.
* Cypress is a free, open-source, locally installed Test Runner and a Dashboard Service for recording your tests.

---
## [25/03/2022 - Day 22]
<h1 align="center"><strong>Mid-Term Presentation Guidelines</h1>

* Had a discussion about the mid-term presentation and objective of the same.
* Guidelines regarding the PPT was made clear.

---
## [28/03/2022 - Day 23]
<h1 align="center"><strong>Preparation of PPT</h1>

* Research and gathering of resourses.
* Started preparing templates.

---
## [29/03/2022 - Day 24]
<h1 align="center"><strong>Preparation of PPT</h1>

* Made flowchart according to working model.
* Researched about alternatives of existing model.

---
## [30/03/2022 - Day 25]
<h1 align="center"><strong>Preparation of PPT</h1>

* Making of ppt.
* Arranging content into slides.
* Final touch-up and made changes accoring to various inputs given.

---
## [31/03/2022 - Day 26]
<h1 align="center"><strong>Mid-term presentation with Team Adapter</h1>

* Presented PPT to team.
* Took inputs.
   
---
## [01/04/2022 - Day 27]
<h1 align="center"><strong>Editing PPT</h1>
   
* Made Appropriate changes.
* Prepared for Presentation with manager.

---
## [02/04/2022 - Day 28]
<h1 align="center"><strong>Mid-term presentation with Senior VP-Cillanki Sir </h1>
  
* Explained Presentation.
* Detailed discussion of Problem statement.
   
---
## [04/04/2022 - Day 30]
<h1 align="center"><strong>Scraping of Axis Bank using puppeteer</h1>

* Understood the work flow of logging into axis bank.
* Discussing the approach of coding.
   
---
## [05/04/2022 - Day 31]
<h1 align="center"><strong>Hands-on with Axis Bank</h1>
  
* Started to implement different approaches.
* Noted down some difficulties faced while coding.
* Went through cheerio's documentation for better understanding.
---
## [06/04/2022 - Day 32]
<h1 align="center"><strong>Doubt Session</h1>
   
* Discussion about the code and approaches.
* Found alternatives for some code snippets for better performance.
* Took inputs regarding some specific corner cases.
   
---
## [07/04/2022 - Day 33]
<h1 align="center"><strong>Downloading the Required Data</h1>
   
* Discussion on how to download and store .csv file.
* Guidelines regarding how to fetech the details from .csv