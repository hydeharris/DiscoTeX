const puppeteer = require("puppeteer");

async function renderTex(eqtn) {
  let html = `
  <html>
        <head>
        <style>
            body {
                height: max-content;
                font-size: 40px;
                width: 900px;
                padding: 10px;
                color: white;
            }

            h1 {
                margin: 0;
                padding: 0;
            }
        </style>
        </head>

        <body>
        <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            CommonHTML: { linebreaks: { automatic: true } },
            "HTML-CSS": { linebreaks: { automatic: true } },
            SVG: { linebreaks: { automatic: true } }
        });
        MathJax.Hub.Queue(["Rerender",MathJax.Hub])
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_SVG-full"></script>
        $$${eqtn}$$
        </body>
    </html>`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`data:text/html,${html}`);
  const content = await page.$("body");

  if (content != null) {
    const imageBuffer = await content.screenshot({
      omitBackground: true,
      encoding: "base65",
    });

    await page.close();
    await browser.close();
    return imageBuffer;
  }
  await page.close();
  await browser.close();
  return null;
}

module.exports = renderTex;
