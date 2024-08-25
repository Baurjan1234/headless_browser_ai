"use client";
import React from "react";
import { chromium } from "playwright-core";

import { DataTable, Table } from "@primer/react/drafts";
import { Box, Button, Link, Label, RelativeTime } from "@primer/react";
import { CDP_ENDPOINT } from "@/utils/global";

type GTableDataType = {
  id: string;
  type: string;
  field: string;
  updateAt: number | string;
  status?: boolean;
};

const data: GTableDataType[] = [
  {
    type: "Hello world",
    field: "Hello field",
    updateAt: 1234565432,
    id: "1",
  },
  {
    type: "Hello world 1",
    field: "Hello field 1",
    updateAt: 1234565432,
    id: "2",
  },
  {
    type: "Hello world2 2",
    field: "Hello field 2",
    updateAt: 1234565432,
    id: "3",
  },
];

const GTable = () => {
  const runChromium = async () => {
    // console.log("Connecting to CDP endpoint...");
    // const browser = await chromium.connectOverCDP(CDP_ENDPOINT);

    try {
      // const browser = await chromium.connectOverCDP("");
    } catch (error) {
      console.log("failed");
      
    }

    try {
      // console.log("Connected to CDP endpoint");
      // // Create a new page
      // console.log("Creating new page...");
      // const context = await browser.newContext();
      // const page = await context.newPage();
      // // Navigate to a website
      // console.log("Navigating to paulgraham.com...");
      // await page.goto("https://www.google.com/search?q=hello+world");
      // // Get the page title
      // console.log("Getting page title...");
      // const title = await page.title();
      // console.log("Page title:", title);
      // // Take a screenshot
      // console.log("Taking screenshot...");
      // await page.screenshot({ path: "yc.png" });
      // console.log("Screenshot saved as yc.png");
      // // Get page content
      // console.log("Getting page content...");
      // const content = await page.content();
      // console.log("Page content length:", content.length);
      // // Close the page and context
      // console.log("Closing page and context...");
      // await context.close();
      // console.log("Test completed successfully");
    } catch (error) {
      console.error("Error during test:", error);
    } finally {
      // Close the browser
      // await browser.close();
      // console.log("Disconnected from CDP endpoint");
    }
  };

  return (
    <Table.Container>
      <Box width="100%" display="flex" justifyContent="space-between" my="10px">
        <Table.Title as="h2" id="repositories">
          All sessions
        </Table.Title>
        <Button
          aria-label="create-button"
          size="small"
          onClick={() => runChromium()}
        >
          Start new session
        </Button>
      </Box>
      <DataTable
        aria-labelledby="repositories"
        aria-describedby="repositories-subtitle"
        data={data}
        columns={[
          {
            header: "Labels",
            field: "type",
            rowHeader: true,
          },
          // {
          //   header: "Type",
          //   field: "type",
          //   renderCell: (row) => {
          //     return <Label>{row.id}</Label>;
          //   },
          // },

          {
            header: "Status",
            field: "status",
            renderCell: (row) => {
              return <Label>failed</Label>;
            },
          },
          {
            header: "Updated",
            field: "updateAt",
            renderCell: (row) => {
              return <RelativeTime date={new Date(123456543)} />;
            },
          },
          {
            header: "Code",
            field: "id",
            renderCell: (row) => {
              return <Link href="#">view</Link>;
            },
          },

          {
            header: "Run",
            field: "id",
            renderCell: (row) => {
              return <Link href="#">run</Link>;
            },
          },
        ]}
      />
    </Table.Container>
  );
};

export default GTable;
