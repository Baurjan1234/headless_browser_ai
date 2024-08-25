"use client";
import { Button, Box } from "@primer/react";
import GTable from "@/components/table";
import { CONTAINER } from "@/utils/global";
const Home = () => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width={CONTAINER} pt={["20px", "30px"]}>
        <GTable />
      </Box>
    </Box>
  );
};

export default Home;
