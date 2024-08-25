"use client";
import React, { useEffect, useState } from "react";

import { DataTable, Table } from "@primer/react/drafts";
import {
  Box,
  Button,
  Link,
  Label,
  RelativeTime,
  IconButton,
} from "@primer/react";

import { IoMdClose } from "react-icons/io";
import { _axios } from "@/utils/axios";
import puppeteer from "puppeteer";

type GTableDataType = {
  browserId: string;
  browser: {
    wsEndpoint: string;
  };
  id: string | number;
};

const GTable = () => {
  const [busy, setBusy] = useState(false);
  const [tableData, setTableData] = useState<GTableDataType[]>([]);

  const fn = async () => {
    const res = await _axios.get("/browsers");

    const itemsWithIds = res.data.map((item: any, i: any) => ({
      ...item,
      id: i,
    }));
    setTableData(itemsWithIds as GTableDataType[]);
  };

  const createSession = async () => {
    const body = {
      browserType: "CHROMIUM",
    };

    setBusy(true);
    const res = await _axios.post("/browsers", body);
    if (res.data) {
      fn();
    }
    setBusy(false);
  };

  const stop = async (id: string) => {
    const res = await _axios.delete(`browsers/${id}`);

    if (res.data) {
      const array = [...tableData].filter((e) => e.browserId !== id);
      setTableData(array);
    }
  };

  const runDebug = async (wSEndpoint: string) => {
    let browser = null;
    // try {
    //   console.log("start.runDebug  ");

    //   browser = await puppeteer.connect({
    //     browserWSEndpoint: wSEndpoint,
    //   });
    //   console.log("browser ");

    //   const page = await browser.debugInfo
    //   console.log("browser.newPage ");

    //   await page.goto("https://example.com");
    //   await page.click("a");
    //   console.log("page.click('a'); ");
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   if (browser) browser.close();
    // }
  };

  useEffect(() => {
    fn();
  }, []);

  return (
    <>
      <Table.Container>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          my="10px"
        >
          <Table.Title as="h2" id="repositories">
            All sessions
          </Table.Title>
          <Button
            aria-label="create-button"
            size="small"
            onClick={() => createSession()}
            disabled={busy}
          >
            Start new session
          </Button>
        </Box>
        <DataTable
          aria-labelledby="repositories"
          aria-describedby="repositories-subtitle"
          data={tableData}
          columns={[
            // {
            //   header: "Type",
            //   field: "type",
            //   renderCell: (row) => {
            //     return <Label>{row.id}</Label>;
            //   },
            // },

            {
              header: "Status",
              field: "id",
              renderCell: (row) => {
                return <Label>Active</Label>;
              },
            },
            {
              header: "Updated",
              field: "id",
              renderCell: (row) => {
                return <RelativeTime date={new Date()} />;
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
              header: "Debug",
              field: "id",
              renderCell: (row) => {
                return (
                  <Link href="#" target="_blank">
                    <Button
                      aria-label="aa"
                      onClick={() => runDebug(row.browser.wsEndpoint)}
                    >
                      live debug
                    </Button>
                  </Link>
                );
              },
            },
            {
              header: "Stop",
              field: "id",
              renderCell: (row) => {
                return (
                  <IconButton
                    onClick={() => {
                      stop(row.browserId);
                    }}
                    icon={IoMdClose}
                    aria-label="close"
                    unsafeDisableTooltip={false}
                  />
                );
              },
            },
          ]}
        />
      </Table.Container>

      <iframe
        src={
          tableData[0]
            ? tableData[0].browser.wsEndpoint
            : "ws://127.0.0.1:54780/devtools/browser/e564965a-1692-4c84-937e-8cedae119ca9"
        }
        sandbox="allow-same-origin allow-scripts"
        allow="clipboard-read; clipboard-write"
        // style="width: 100%; height: 80vh;"
        style={{
          width: "100%",
          height: "80vh",
        }}
      />
    </>
  );
};

export default GTable;
