import React, { createContext, useState } from "react";
import { useContext } from "react";
import { OktoProvider, BuildType } from "okto-sdk-react";
// Create a context with a default value
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const buildType = BuildType.SANDBOX
  const apiKey = process.env.NEXT_PUBLIC_OKTO_CLIENT_KEY 
  return (
    <AppContext.Provider value={{ apiKey,buildType}}>
      <OktoProvider apiKey={apiKey} buildType={buildType}>
        {children}
      </OktoProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
