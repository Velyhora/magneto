import { Locator, Page } from "@playwright/test";
export class LoginPage {

    readonly page: Page
    readonly emailField = 'Email'
    readonly passwordField = 'Password'
    readonly signInButton = 'button[class="action login primary"]'
    readonly greetingMessage = 'li[class="greet welcome"]'

    constructor(page: Page) {
        this.page = page
    }

    performLogin = async (username: string, password: string) => {
        await this.page.getByText('Sign In').first().click()

        await this.page.getByTitle(this.emailField).fill('velyhora@gmail.com')
        await this.page.getByTitle(this.passwordField).fill('Vd1335667!')
        await this.page.locator(this.signInButton).click()
    }

    getGreetingMessageText = async (firstAndLast: string) => {
        
        return await this.page.getByRole('banner').getByText(`Welcome, ${firstAndLast}!`).textContent()
        //  locator form playwright  getByRole('banner').getByText('Welcome, Dima Velyhora!') 
        //  The reason I chose this locating strategy is because the page is dynamically rendered by JS
        // And the conventional locators made it very hard to retrieve the element's properties.
        //`Welcome, ${firstAndLast}!`
        //'Welcome, Dima Velyhora!'
        
    }

}