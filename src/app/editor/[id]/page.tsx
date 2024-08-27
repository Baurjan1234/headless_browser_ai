"use client";
import { Box, Octicon, Header, Button, Text, Avatar } from "@primer/react";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { DiGithub } from "react-icons/di";

const initialCode = `
import { chromium, Page } from "playwright-core";

(async () => {
  const endpoint = "@{wsEndpointURL}";
  const browser = await chromium.connectOverCDP(endpoint);
  const context = await browser.newContext();
  const page = await context.newPage();

  const fn = async (page: Page): Promise<any> => {
    await page.goto("http://www.infinite.mn");
    const title = await page.title();
    // const ss = await page.screenshot({ path: "public/haha.png" });
    return { title };
  };


  const result = await fn(page);
  return result;
})();
`;

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const [pressedKeys, setPressedKeys] = useState(new Set());

  const [busy, setBusy] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const q = searchParams.get("q") || "";

  const [code, setCode] = useState(initialCode.replace("@{wsEndpointURL}", q));
  const runDebug = async () => {
    if (busy) return;
    setBusy(true);
    setResponse(null);
    const res = await axios.post("/api/", {
      wsEndpoint: q,
      code,
    });
    setResponse(res.data);
    setBusy(false);
  };

  return (
    <div>
      <Header>
        <Header.Item full>
          <Header.Link
            href="/"
            sx={{
              fontSize: 2,
            }}
          >
            <Octicon
              icon={DiGithub}
              size={32}
              sx={{
                mr: 2,
              }}
            />
            <span>Home</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full>Live Debug</Header.Item>

        <Header.Item sx={{ mr: 0 }}>
          <Button
            aria-label="run"
            onClick={() => runDebug()}
            disabled={busy}
            size="large"
            variant="primary"
            onKeyDown={(e) => {
              console.log("e", e);
            }}
          >
            {busy ? "Running..." : "Run"}
          </Button>
        </Header.Item>
      </Header>
      <Box display="flex" width="100%" bg="red">
        <CodeMirror
          // lang="typescript"
          width="100%"
          value={code}
          style={{ width: "100%" }}
          height="500px"
          theme={"dark"}
          onKeyDown={(e) => {
            setPressedKeys((prevKeys) => new Set(prevKeys).add(e.key));
            if (pressedKeys.has("Meta") && e.key === "Enter") {
              e.preventDefault();
              runDebug();
            }
          }}
          onChange={(str, v) => {
            setCode(str);
          }}
          placeholder={"Write your code here"}
        />

        <Box height="500px" width="50%" backgroundColor="grey" full>
          Frame
        </Box>
      </Box>
      {response && (
        <Box mt="20px" p={3} m={3} border="1px solid black">
          <Text>{JSON.stringify(response, null, 2)}</Text>
        </Box>
      )}
    </div>
  );
};

export default Page;
