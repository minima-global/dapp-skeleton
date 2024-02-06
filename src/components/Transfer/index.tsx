import { Formik } from "formik";
import { useWalletContext } from "../../providers/wallet/WalletProvider";
import { useState } from "react";

import * as utils from "../../utils";

import styles from "./Balance.module.css";

const Transfer = () => {
  const { transfer } = useWalletContext();

  const [error, setError] = useState<false | string>();
  const [etherscanLink, setEtherScanLink] = useState<false | string>();

  return (
    <Formik
      initialValues={{
        amount: "",
        address: "",
      }}
      onSubmit={async ({ address, amount }, { setSubmitting }) => {
        try {
          const etherScanLink = await transfer(address, amount);

          setEtherScanLink(etherScanLink!);
        } catch (error) {
          utils.log("Transfer Error Logs" + error);
          setSubmitting(false);
          setError(error as string);
        }
      }}
    >
      {({
        getFieldProps,
        errors,
        touched,
        isValid,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className={styles["tokens"]} onSubmit={handleSubmit}>
          <input
            disabled={isSubmitting}
            required
            {...getFieldProps("amount")}
            type="text"
            placeholder="Your amount"
            className={`mb-2 ${
              touched.amount && errors.amount ? "outline !outline-red-500" : ""
            }`}
          />
          {touched.amount && errors.amount && (
            <span className="my-2 bg-red-500 rounded px-4 py-1">
              {errors.amount}
            </span>
          )}
          <input
            disabled={isSubmitting}
            required
            autoComplete="off"
            {...getFieldProps("address")}
            type="text"
            placeholder="Recipient address"
            className={`mb-2 ${
              touched.address && errors.address
                ? "outline !outline-red-500"
                : ""
            }`}
          />
          {touched.address && errors.address && (
            <span className="my-2 bg-red-500 rounded px-4 py-1">
              {errors.address}
            </span>
          )}

          {etherscanLink && (
            <a href={etherscanLink} target="_blank">
              View on Etherscan
            </a>
          )}

          {error && (
            <span className="my-2 bg-red-500 rounded px-4 py-1 break-all">
              {JSON.stringify(error)}
            </span>
          )}

          <button
            disabled={isSubmitting || !isValid}
            className="bg-green-600 text-white"
            type="submit"
          >
            Transfer
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Transfer;
