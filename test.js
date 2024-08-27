const { chromium } = require("playwright-core");

const CDP_ENDPOINT = `ws:// `;

async function runTest() {
  console.log("Connecting to CDP endpoint...");
  const browser = await chromium.connectOverCDP(CDP_ENDPOINT);

  try {
    console.log("Connected to CDP endpoint");

    // Create a new page
    console.log("Creating new page...");
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to a website
    console.log("Navigating to paulgraham.com...");
    await page.goto("https://paulgraham.com/articles.html");

    // Get the page title
    console.log("Getting page title...");
    const title = await page.title();
    console.log("Page title:", title);

    // Take a screenshot
    console.log("Taking screenshot...");
    await page.screenshot({ path: "yc.png" });
    console.log("Screenshot saved as yc.png");

    // Get page content
    console.log("Getting page content...");
    const content = await page.content();
    console.log("Page content length:", content.length);

    // Close the page and context
    console.log("Closing page and context...");
    await context.close();

    console.log("Test completed successfully");
  } catch (error) {
    console.error("Error during test:", error);
  } finally {
    // Close the browser
    await browser.close();
    console.log("Disconnected from CDP endpoint");
  }
}

runTest().catch(console.error);