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
import { GTableDataType } from "@/utils/types";

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

  useEffect(() => {
    fn();
  }, []);

  return (
    <>
      <Table.Container>
        <Table.Header>
          <Table.Body>afdasf</Table.Body>
          <Box
            // width="200%"
            display="flex"
            my="10px"
          >
            <Table.Title as="h2" id="repositories">
              All sessions
            </Table.Title>
            <Button
              sx={{ marginLeft: "24px" }}
              aria-label="create-button"
              size="small"
              onClick={() => createSession()}
              disabled={busy}
            >
              Start new session
            </Button>
          </Box>
        </Table.Header>

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
                  <Link
                    href={`/editor/${row.browserId}?q=${row.browser.wsEndpoint}`}
                    // target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button aria-label="live debug" size="small">
                      live debug
                    </Button>
                  </Link>
                );
              },
            },
            {
              header: "Stop",
              field: "id",
              align: "end",

              rowHeader: false,
              renderCell: (row) => {
                return (
                  <IconButton
                    onClick={() => {
                      stop(row.browserId);
                    }}
                    icon={IoMdClose}
                    size="small"
                    aria-label="stop"
                    unsafeDisableTooltip={false}
                  />
                );
              },
            },
          ]}
        />
      </Table.Container>

      {/* <iframe
        src={
          gf
          // "ws://127.0.0.1:53446/devtools/browser/e8d39ebb-d9d1-4776-9785-bb37999d3922"
        }
        sandbox="allow-same-origin allow-scripts"
        allow="clipboard-read; clipboard-write"
        // style="width: 100%; height: 80vh;"
        style={{
          width: "100%",
          height: "80vh",
        }}
      /> */}
    </>
  );
};

export default GTable;
