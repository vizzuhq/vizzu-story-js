import puppeteer from "puppeteer";
import fs from "fs";

test("vizzu _setStyle method exists", async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const vizzuPlayer = fs.readFileSync("./src/vizzu-player.js", "utf8");
  const regexPattern =
    /https:\/\/cdn\.jsdelivr\.net\/npm\/vizzu@[0-9.]+\/dist\/vizzu\.min\.js/g;
  const vizzuUrls = vizzuPlayer.match(regexPattern);

  await page.goto(`data:text/html,<script type="module">
      const Vizzu = (await import("${vizzuUrls[0]}")).default;
        
      const div = document.createElement("div");
      const vizzu = new Vizzu(div);

      window.hasSetStyle = typeof vizzu._setStyle === 'function';
    </script>`);

  await page.waitForFunction("window.hasSetStyle !== undefined");

  const hasSetStyle = await page.evaluate(() => {
    return window.hasSetStyle;
  });

  await browser.close();

  expect(hasSetStyle).toBeTruthy();
});
