const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { text } = require('cheerio/lib/static');
const { find } = require('domutils');
//id -> # class -> .
(async () => {
    var a = []
    var b = []
    var $ = cheerio.load(fs.readFileSync('dumps/dump4.html'));
    

    // $("#ordersContainer ").each((i,elem) => {
    //     console.log($(elem).find('a-row a-size-base').text())

    // })

    //hardcoded to retrieve date
    // var order = $('#ordersContainer > div:nth-child(2) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span');
    // console.log($(order).html());

    b.push({
        OrderId:$('#ordersContainer > div:nth-child(2) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(2) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(2) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1)').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(3) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(3) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(3) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(5) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(5) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(5) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(6) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(6) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(6) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(6) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(6) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(6) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(8) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(8) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(8) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(9) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(9) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(9) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(10) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(10) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(10) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(10) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(10) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(10) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(11) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(11) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(11) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1) > a').text().trim(),
    },
    {
        OrderId:$('#ordersContainer > div:nth-child(12) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.actions.a-col-right > div.a-row.a-size-mini > span.a-color-secondary.value > bdi').text().trim(),
        Date:$('#ordersContainer > div:nth-child(12) > div.a-box.a-color-offset-background.order-info > div > div > div > div.a-fixed-right-grid-col.a-col-left > div > div.a-column.a-span3 > div.a-row.a-size-base > span').text().trim(),
        Name_of_item:$('#ordersContainer > div:nth-child(12) > div:nth-child(2) > div > div.a-fixed-right-grid.a-spacing-top-medium > div > div.a-fixed-right-grid-col.a-col-left > div > div > div > div.a-fixed-left-grid-col.a-col-right > div:nth-child(1)').text().trim(),
    })


    var i = $('#ordersContainer')
    i.each((j,el) =>{
        var con = $("div:nth-child(2)",el).text();
        // console.log(con.replace(/\s+\n +/g,'\n').trim());
        var c = con.replace(/\s+\n +/g,'\n').trim()
        a.push(c)
        
        // console.log($(con).text().split('\n').join(' ').trim()[10])
        // var a = $(con).text().replace(/\s\n+/g, '\n').split()
        // console.log(a[0])

        // console.log(typeof $(con).text().trim())

    })
    
    function iter(){
        const data = $('#ordersContainer')
        .children()
        .map(function (i,el){
            console.log({
                date:$(this).find(".a-color-secondary value").text(),
                price:$(this).find("a-color-secondary value").text(),
            })
        })
        .toArray();
    }
    // iter()
    console.log(b)
})
();






// for (let i = 0; i < order.length; i++) {
//     let contents = $(order[i]).find("a-row a-size-base");
//     content = $(contents).text();


//     // console.log(contents)
// }

// var orders = order.text();
// console.log(orders)
// var s = String();

// function con( orders ) {
//     return s.concat(orders.replace( /[\r\n]+/gm, "\n" ));
// }
// for (let i = 0; i < orders.length; i++) {
//     con(orders);    
// }
// // console.log(con(orders));
// console.log(orders.length);
