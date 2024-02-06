import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { HDNodeWallet, Wallet, JsonRpcProvider, parseUnits } from "ethers";

import aes from "crypto-js/aes";
import * as cryptoJs from "crypto-js";
import * as utils from "../../utils";
import { appContext } from "../../AppContext";
import { Signer } from "ethers";

type Props = {
  children: React.ReactNode;
};
type Context = {
  // key: string | null;
  // phrase: string | null;

  _wallet: Wallet | null;
  _balance: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  transfer: (address: string, amount: string) => void;

  // createWallet: (_password: string) => void;
  // anitaMoney: () => Promise<string>;
  // loadWallet: (_password: string) => void;
};

// Just find-replace "XContext" with whatever context name you like. (ie. DankContext)
const WalletContext = createContext<Context | null>(null);

export const WalletContextProvider = ({ children }: Props) => {
  const { _provider } = useContext(appContext);

  const [_wallet, setWallet] = useState<Wallet | null>(null);
  const [_balance, setBalance] = useState("");
  const [step, setStep] = useState(1);

  // const key = localStorage.getItem("encryptedPrivateKey");
  // const provider: JsonRpcProvider = new JsonRpcProvider(
  //   "http://localhost:8545"
  // );
  // const [slushing, setSlush] = useState(false);

  // when provider changes change wallet
  useMemo(() => {
    utils.log("Changing network...");
    const generatedKey =
      "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6";
    const wallet = new Wallet(generatedKey, _provider);

    setWallet(wallet);
  }, [_provider]);

  // const anitaMoney = async () => {
  //   setSlush(true);
  //   const SlushWallet = new Wallet(import.meta.env.VITE_SLUSH_WALLET, provider);
  //   utils.log(
  //     "Preparing to fund ourselves from wallet: " + SlushWallet.address
  //   );

  //   const tx = await SlushWallet?.sendTransaction({
  //     to: wallet!.address,
  //     value: parseUnits("1000", "ether"),
  //   }).catch((err) => {
  //     console.log("Error caught...");
  //     throw err;
  //   });
  //   console.log("Returning..");

  //   setSlush(false);

  //   return `https://sepolia.etherscan.io/tx/${tx!.hash}`;
  // };

  // const loadWallet = async (_password: string) => {
  //   try {
  //     utils.log("Decrypting key with password: " + _password);
  //     utils.log("Decrypting key found in localStorage: " + key);
  //     const bytes = aes.decrypt(key, _password);
  //     utils.log("bytes: " + bytes);
  //     const privateKey = bytes.toString(cryptoJs.enc.Utf8);
  //     utils.log("Receovered private key: " + privateKey);
  //     const wallet = new Wallet(privateKey, provider);
  //     console.log("Recovered wallet: " + wallet.address);
  //     setWallet(wallet);

  //     // get balance
  //     const b = await provider.getBalance(wallet.address);
  //     setBalance(b.toString());
  //     utils.log("Wallet balance: " + b);

  //     setStep(3);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const createWallet = async (_password: string) => {
  //   const mnemonic = Wallet.createRandom().mnemonic;
  //   utils.log("Created random mnemonic: " + mnemonic!.phrase);
  //   setPhrase(mnemonic!.phrase);

  //   const wallet = HDNodeWallet.fromMnemonic(mnemonic!);
  //   utils.log("Created wallet from mnemonic: " + wallet.address);
  //   utils.log(
  //     "Transaction count: " +
  //       (await provider.getTransactionCount(wallet.address))
  //   );
  //   utils.log("Original private key: " + wallet.privateKey);
  //   const _wallet = new Wallet(wallet.privateKey, provider);

  //   wallet.connect(provider);
  //   setWallet(_wallet);

  //   utils.log(`Network connection: ${wallet.provider}`);

  //   // get balance
  //   const b = await provider.getBalance(wallet.address);
  //   setBalance(b.toString());
  //   utils.log("Wallet balance: " + b);

  //   encryptAndStorePrivateKey(wallet!.privateKey, _password);

  //   setStep(2);
  // };

  const transfer = async (address: string, amount: string) => {
    utils.log("Preparing a transfer from " + _wallet!.address);

    const tx = await _wallet
      ?.sendTransaction({
        to: address,
        value: parseUnits(amount, "ether"),
      })
      .catch((err) => {
        console.log("Error caught...");
        throw err;
      });
    console.log("Returning..");

    return `https://sepolia.etherscan.io/tx/${tx!.hash}`;
  };

  // const encryptAndStorePrivateKey = (
  //   _privateKey: string,
  //   _password: string
  // ) => {
  //   utils.log("Encrypting private key");
  //   const encryptedPrivateKey = aes.encrypt(_privateKey, _password).toString();
  //   utils.log("Encrypted private key: " + encryptedPrivateKey);

  //   localStorage.setItem("encryptedPrivateKey", encryptedPrivateKey);
  // };

  return (
    <WalletContext.Provider
      value={{
        _wallet,
        step,
        setStep,
        _balance,
        transfer,

        // key,
        // phrase,
        // createWallet,

        // anitaMoney,
        // loadWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context)
    throw new Error(
      "WalletContext must be called from within the WalletContextProvider"
    );

  return context;
};
