const puppeteer = require('puppeteer');
require('dotenv').config();

const website = process.env.GITHUB_URL;

async function scrape(user) {
    const browser = await puppeteer.launch({
        defaultViewport:{
            height: 800,
            width: 1200
        }
    });
    const page = await browser.newPage();

    console.log('Application started...');

    const data = [
        { name: 'nickName', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.col-10.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block' },
        { name: 'fullName', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.col-10.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-name.vcard-fullname.d-block.overflow-hidden' },
        { name: 'stars', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div > div > a:nth-child(3) > span' },
        { name: 'followers', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div > div > a:nth-child(1) > span' },
        { name: 'following', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div > div > a:nth-child(2) > span' },
        { name: 'location', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > ul > li:nth-child(2) > span' }
    ];

    await page.goto(`${website}/login`);
    await page.type('#login_field', process.env.GITHUB_USER);
    await page.type('#password', process.env.GITHUB_PASSWORD);

    await page.click('[name="commit"]');
    await page.screenshot({ path: 'loginpage.png' });

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: 'loggedpage.png' });

    await page.goto(`${website}${user}`, { waitUntil:'' });
    await page.screenshot({ path: 'userPage.png' });

    const items = [];
    for (let index = 0; index < data.length; index += 1) {
        items.push({
            [data[index].name]: await page.$eval(data[index].selector, item => item.textContent).catch(()=> '')
        });
    }
    browser.close();
    console.log('Application finish...');
    return items;
};
scrape('lucaswunder').then((value) => {
    console.log(value);
});
