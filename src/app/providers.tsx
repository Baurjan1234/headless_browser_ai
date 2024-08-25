import React, { ReactNode } from "react";
import { ThemeProvider, BaseStyles } from "@primer/react";

type ProvidersType = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersType) => {
  return (
    <ThemeProvider colorMode="light">
      <BaseStyles>{children}</BaseStyles>
    </ThemeProvider>
  );
};

export default Providers;
