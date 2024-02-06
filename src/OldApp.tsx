import "./App.css";
import { useState } from "react";
import { Formik, FormikValues } from "formik";
import { useWalletContext } from "./providers/wallet/WalletProvider";
import { formatEther } from "ethers";
import * as utils from "./utils";
import Transfer from "./components/Transfer";

function App() {
  const {
    step,
    setStep,
    phrase,
    wallet,
    balance,
    anitaMoney,
    loadWallet,
    createWallet,
  } = useWalletContext();

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<false | string>(false);

  const handleDoubleClick = () => {
    handleCopy();
  };

  const handleCopy = () => {
    setCopied(true);
    utils.copyToClipboard(phrase);
  };

  const handleGenerateWallet = async (values: FormikValues, actions: any) => {
    try {
      await createWallet(values.password);
      actions.setSubmitting(false);
    } catch (error) {
      setError(error as string);
    }
  };

  const handleLoadWallet = async (values: FormikValues, actions: any) => {
    try {
      await loadWallet(values.password);
      actions.setSubmitting(false);
    } catch (error) {
      setError(error as string);
    }
  };

  const handleButtonStepNext = () => {
    setStep((prevState) => prevState + 1);
  };

  const handleButtonStepPrevious = () => {
    setStep((prevState) => prevState - 1);
  };

  return (
    <>
      <div>
        <h1 className="text-xl mb-4">Ethereum Wallet - Connect</h1>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={() => {
            // don't use default behavior
          }}
        >
          {({ handleSubmit, getFieldProps, values, setSubmitting }) => (
            <>
              {step === 1 && (
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <input
                    className="bg-slate-200 p-4 rounded"
                    placeholder="Your password"
                    type="text"
                    {...getFieldProps("password")}
                  />

                  <button
                    type="button"
                    onClick={() => handleLoadWallet(values, { setSubmitting })}
                    className="bg-black text-white"
                  >
                    Load Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleGenerateWallet(values, { setSubmitting })
                    }
                    className="bg-black text-white"
                  >
                    Create New
                  </button>
                </form>
              )}

              {step === 2 && (
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <input
                    onDoubleClick={handleDoubleClick}
                    readOnly
                    className="bg-slate-200 p-4 rounded"
                    value={phrase ? phrase : "Invalid"}
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      appearance: "none",
                      padding: 8,
                      border: 0,
                      outline: 0,
                      cursor: "pointer",
                    }}
                    className={`${
                      copied
                        ? "outline-2 outline-offset-2 shadow-2xl outline-red-500 "
                        : ""
                    } relative items-center w-full mt-4 mx-auto font-bold text-black bg-teal-300 max-w-[200px] flex justify-between dark:text-black`}
                  >
                    {!copied ? "Copy" : "Copied"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28"
                      viewBox="0 -960 960 960"
                      width="28"
                      style={{
                        color: "#0809ab",
                        position: "relative",
                        top: 0,
                        right: 0,
                        strokeDasharray: 50,
                        strokeDashoffset: copied ? -50 : 0,
                        transition: "all 300ms ease-in-out",
                        opacity: copied ? 0 : 1,
                      }}
                    >
                      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        color: "black",
                        position: "absolute",
                        top: 12,
                        right: 10,
                        strokeDasharray: 50,
                        strokeDashoffset: copied ? 0 : -50,
                        transition: "all 300ms ease-in-out",
                      }}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </button>
                  <button
                    className="bg-black text-white"
                    onClick={handleButtonStepNext}
                  >
                    Next
                  </button>
                </form>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-2">
                  <label className="grid text-left">
                    <span className="font-bold">Address</span>
                    <div className="flex gap-1 items-center">
                      {wallet!.address}
                      <button
                        onClick={anitaMoney}
                        className="bg-orange-500 text-white p-1 text-sm flex items-center"
                      >
                        Anita Money{" "}
                        <svg
                          className="text-white fill-teal-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 11h14v-3h-14z" />
                          <path d="M17.5 11l-1.5 10h-8l-1.5 -10" />
                          <path d="M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
                          <path d="M15 5v-2" />
                        </svg>
                      </button>
                    </div>
                  </label>

                  <label className="flex justify-between">
                    <span className="font-bold">Your balance</span>
                    {formatEther(balance)}
                  </label>

                  <div>
                    <h1 className="text-left text-xl text-blue-500 font-bold mb-2">
                      Transfer funds
                    </h1>
                    <Transfer />
                  </div>

                  <button
                    className="bg-black text-white mt-8"
                    onClick={handleButtonStepPrevious}
                  >
                    Back
                  </button>
                </div>
              )}
            </>
          )}
        </Formik>
      </div>
    </>
  );
}

export default App;
