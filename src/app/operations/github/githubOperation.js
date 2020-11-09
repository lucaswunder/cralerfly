module.exports = ({ config, puppeterClient }) => ({
    execute: async ({ username }) => {
        const { application: { screenshot_path }, GITHUB_URL, GITHUB_USER, GITHUB_PASSWORD } = config;

        const browser = await puppeterClient.launch({
            defaultViewport:{
                height: 800,
                width: 1200
            }
        });
        const page = await browser.newPage();

        const selectorsInfo = [
            { name: 'nickName', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.col-10.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block' },
            { name: 'fullName', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.col-10.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-name.vcard-fullname.d-block.overflow-hidden' },
            { name: 'stars', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div > div > a:nth-child(3) > span' },
            { name: 'followers', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div > div > a:nth-child(1) > span' },
            { name: 'following', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div > div > a:nth-child(2) > span' },
            { name: 'location', selector:'#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > ul > li:nth-child(2) > span' }
        ];
        console.log('Headless Browser started...');

        await page.goto(`${GITHUB_URL}/login`);
        await page.type('#login_field', GITHUB_USER);
        await page.type('#password', GITHUB_PASSWORD);

        await page.click('[name="commit"]');
        await page.screenshot({ path: `${screenshot_path}loginpage.png` });

        await page.waitForNavigation({ waitUntil: 'load' });
        await page.screenshot({ path: `${screenshot_path}loggedpage.png` });

        await page.goto(`${GITHUB_URL}${username}`);
        await page.screenshot({ path: `${screenshot_path}userPage.png` });

        const items = {};
        await Promise.all(selectorsInfo.map(async item => {
            items[item.name] = await page.$eval(item.selector, item => item.textContent).catch(()=> '');
        }));

        browser.close();
        console.log('Headless Browser finish job');
        return {
            'User_Info': items
        };
    }
});
