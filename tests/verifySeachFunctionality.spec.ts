const { test, expect } = require('@playwright/test');

test('Verify Search Functionality', async ({ page }) => {

    // Navigate to the homepage
        await page.goto('/')
    
    // Enter a product name in the search bar
    const searchTerm = 'Top';     // if use for example "Tops" last  validation will failed
    await page.fill('input[name="q"]', searchTerm);
    await page.press('input[name="q"]', 'Enter');
    
    // Wait for search results to load
    await page.waitForSelector('.product-item-link');
    
    // Verify that the search results display relevant products
    const productResults = await page.locator('.product-item-link');
    const productCount = await productResults.count();
    expect(productCount).toBeGreaterThan(0);


    // Validate that at least one product contains the search term in its name or description
    let foundRelevantProduct = false;
    for (let i = 0; i < productCount; i++) {
        const productName = await productResults.nth(i).textContent();
        console.log(`Product ${i + 1}:`, productName);  // Log the product name
        if (productName && productName.trim().toLowerCase().includes(searchTerm.toLowerCase())) {
            foundRelevantProduct = true;
            break;
        }
    } 
    expect(foundRelevantProduct, `Expected at least one product to match search term '${searchTerm}', but found none.`).toBe(true);

});