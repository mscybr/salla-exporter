(fs = require("fs")), (puppeteer = require("puppeteer"));
const agents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/79.0.3945.73 Mobile/15E148 Safari/604.1",
];

async function main() {
  let browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // const pageTarget = page.target();
  await page.setUserAgent(agents[0]);

  // sign in
  let url =
    "https://fawaid.de/salah-app/current/%23location1/%23App/App-online.php";
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(`Object.entries(timings_export).length != 0`);
  let timings = await page.evaluate("timings_export");
  console.log(timings);
  fs.writeFileSync(__dirname + "/timings_export.json", JSON.stringify(timings));
  browser.close();
}

main();
