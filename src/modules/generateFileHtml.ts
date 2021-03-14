export const generateHtml = (fileList: string[]): string => {
  const baseHref = process.env.BASE_PATH || "http://localhost:8080";
  const htmlList = fileList
    .map((el) => `<li><a href=${baseHref + el}>${el}</a></li>`)
    .join("");

  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="nhcarrigan cdn - file list" />
      <meta property="og:url" content="https://cdn.nhcarrigan.com/files" />
      <meta
        property="og:description"
        content="List of current files available on my cdn"
      />
      <title>nhcarrigan cdn</title>
      <style>
        body {
          background-color: #3a3240;
          color: #aea8d3;
          text-align: center;
          margin: 0;
        }
        a {
          color: #aea8d3;
        }
        ul {
            list-style: none;
            padding: 0;
        }
      </style>
    </head>
    <body>
      <h1>File List</h1>
        <p>These are all of the files available on the CDN.</p>
        <ul>
          ${htmlList}
        </ul>
    </body>
  </html>
      `;
};
