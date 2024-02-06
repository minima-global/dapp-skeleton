import { JsonRpcProvider } from "ethers";
import { createContext, useRef, useEffect, useState } from "react";

export const appContext = createContext({} as any);

interface IProps {
  children: any;
}
// http://127.0.0.1:8545
// https://sepolia.infura.io/v3/05c98544804b478994665892aeff361c
const AppProvider = ({ children }: IProps) => {
  const loaded = useRef(false);

  const [_provider, setProvider] = useState<JsonRpcProvider>(
    new JsonRpcProvider("http://127.0.0.1:8545")
  ); // mainnet, sepolia, hardhat, etc...
  const [_promptSelectNetwork, setSelectNetwork] = useState(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      (window as any).MDS.init((msg: any) => {
        if (msg.event === "inited") {
          // do something Minim-y
        }
      });
    }
  }, [loaded]);

  const promptSelectNetwork = () => {
    setSelectNetwork((prevState) => !prevState);
  };

  return (
    <appContext.Provider
      value={{
        _promptSelectNetwork,
        promptSelectNetwork,

        _provider,
        setProvider,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
