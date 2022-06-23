import { createContext, useEffect, useState } from "react";

const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  return (
    <SessionContext.Provider
      value={{  }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionContextProvider };
