import { CDP_ENDPOINT } from "@/utils/global";
import axios from "axios";
import { NextResponse } from "next/server";
import { chromium, Page } from "playwright-core";
import * as ts from "typescript";

type ResponseData = {
  message: string;
};

async function compileCodeAPI(requestData: any) {
  const endpoint = "https://emkc.org/api/v2/piston/execute";

  try {
    const response = await axios.post(endpoint, requestData);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

export async function GET() {
  try {
    const browser = await chromium.connectOverCDP(CDP_ENDPOINT);

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://www.google.com");

    const title = await page.title();
    console.log("Page title:", title);
    return NextResponse.json({ message: "title", title });
  } catch (error) {
    return NextResponse.json({ message: "NextResponse error", error });
  }
}

function compileTypeScript(code: string): string {
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  return result.outputText;
}

// const fn = async (page: Page): Promise<string> => {
//   await page.goto("http://www.google.com");

//   const title = await page.title();
//   const img = await page.screenshot({ path: "example.png" });
//   return title;
// };

export async function POST(request: Request) {
  try {
    // res.status(200).json({ message: "Hello from Next.js
    const body = await request.json();
    const { code, wsEndpoint } = body;

    const jsCode = compileTypeScript(code);
    const result = await eval(jsCode);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Next Response error", error });
  }

  // let browser = null;

  // await puppeteer
  //   .launch()
  //   .then(async (browser) => {
  //     const page = await browser.newPage();
  //     await page.goto("http://www.example.com/");
  //     const title = await page.title();
  //     return NextResponse.json({ message: "Hello from Next.js!", title });
  //   })
  //   .catch((error) => {});
  // .finally(() => browser && browser.close());
  return NextResponse.json({ message: "Hello from Next.js!", error: "Error" });
}
