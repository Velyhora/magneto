import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'
import { assert } from 'console'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.performLogin('Velyhora', 'Vd1335667!')


    expect(await loginPage.getGreetingMessageText('Dima Velyhora')).not.toBeNull();
 

})