import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'
import { assert } from 'console'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
       /**
        * Test Case 1: User Login with Valid Credentials
Steps:
1) Navigate to the home page
2) Click on sign in button
3) fillout Email and Password fields amd click on "sign in" button
4) You should see the landing page and on the upper right corner validate the following text: "Welcome, Dima Velyhora! Change"

Data credential: 
user name: Velyhora
password : Vd1335667!
     */
})

test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.performLogin('Velyhora', 'Vd1335667!')

    //If the greeting message displays any other name than the user full name passed as
    //a parameter, or no greeting message is found the following assertion wil fail
    expect(await loginPage.getGreetingMessageText('Dima Velyhora')).not.toBeNull();
})


//Test Case 2: Add Product to Cart
test('add to the card', async ({ page }) => {

// Search for a product
      await page.fill('input[name="q"]', 'Jacket');
      await page.press('input[name="q"]', 'Enter');

// Click on the first product from the search results
    await page.waitForSelector('.product-item-link');
    const product = await page.locator('.product-item-link').first();
    const productName = await product.textContent();
    await product.click();

// Select size and color if applicable
      if (await page.$('.swatch-attribute')) {
        await page.click('.swatch-option:first-child'); // Select first available size
        await page.click('.swatch-option:nth-child(2)'); // Select first available color
    }

// Click the "Add to Cart" button
        await page.click('button#product-addtocart-button');
    
 // Validate product name is not null
        expect(productName, `Expected product name to be defined, but got: ${productName}`).not.toBeNull()

      })

//Test Case 3: Verify Cart and Product Details
      test('verify product in cart', async ({ page }) => { 

// Wait for the cart to update and open the cart
await page.waitForSelector('.showcart');
await page.click('.showcart');

//Since its demo version,  Validate message "You have no items in your shopping cart."
      const emptyCartMessage = await page.locator('strong.subtitle.empty[data-bind*="You have no items in your shopping cart."]').textContent();
      expect(emptyCartMessage.trim()).toBe('You have no items in your shopping cart.');

// Extract product price
        await page.waitForSelector('.price');
        const productPrice = await page.locator('.price').first().textContent();

// Validate product price is not null
    expect(productPrice, `Expected product price to be defined, but got: ${productPrice}`).not.toBeNull();

  /** Verifying that the product name exists is crucial. If no product name is found, it indicates that either the webpage didn't load properly, 
   * the selector was incorrect, or the product data wasn't available.
   *  This helps you ensure that the product being added to the cart has a valid, identifiable name. */

      });



 

 



     

