MDS.load("ethers-v4.min.js");

MDS.log("Start create Wallet..");

const senderPrivateKey =
  "5e54e723190a843dd46c14d26459827fee8eca195ed32ec28fc73aee689056e0";
const senderWallet = "0xd193E5D0AfB01d6354ae7666C2E3D5222ae8abD7";
const receiverWallet = "0xF359f96Ab44A92877B8FF50340fD8c0eD119e8aB";

MDS.net.POST(
  "https://sepolia.infura.io/v3/05c98544804b478994665892aeff361c",
  JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_getTransactionCount",
    params: ["0xd193E5D0AfB01d6354ae7666C2E3D5222ae8abD7", "latest"],
    id: 1,
  }),
  function (resp) {
    MDS.log(JSON.stringify(resp));
    const json = JSON.parse(resp.response);
    const nonce = Number(json.result);
    MDS.log(nonce);

    const rawTxn = {
      nonce: nonce,
      to: receiverWallet,
      gasLimit: 30000,
      gasPrice: ethers.utils.bigNumberify("20000000000"),
      value: ethers.utils.parseEther("1.0"),
      data: "0x",
      chainId: "0xaa36a7",
    };

    const wallet = new ethers.Wallet(senderPrivateKey);
    // we serialize it next
    // const serializedTransaction = ethers.utils.serializeTransaction(rawTxn);

    // MDS.log("Serialized: " + serializedTransaction);

    // let signPromise = wallet.sign(rawTxn);
    MDS.net.POST(
      "https://sepolia.infura.io/v3/05c98544804b478994665892aeff361c",
      JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_estimateGas",
        params: [
          {
            from: senderWallet,
            to: receiverWallet,
            value: "0x9184e72a",
          },
        ],
        id: 1,
      }),
      function (resp) {
        MDS.log(JSON.stringify(resp));
        const estimatedGas = resp.response;

        MDS.log("estimatedGas: " + JSON.stringify(estimatedGas));
        // MDS.net.post("", )
      }
    );

    // wallet.sign(rawTxn).then(function (signedTransaction) {
    //   MDS.log("Signed:" + signedTransaction);

    //   /**
    //    * Minima @ 30/01/2024 16:37:41 [129.0 MB] : MDS_Ethwallet_0x6EE1691C8D7E2963D589B3E3EC05CC44E8B2687E2609D54E3D99849594091B96 > [NOTIFY:false] {"request":"POST","url":"https://sepolia.infura.io/v3/05c98544804b478994665892aeff361c","data":"{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[\"0xf870108504a817c80082753094f359f96ab44a92877b8ff50340fd8c0ed119e8ab880de0b6b3a7640000808401546d72a0f9baf21c7e08f86adf4cd5f66d126b7421130ece1e83bc98e56d140436e328f5a07a5ef77684ff9e3b421c9800b844e0318f648be38949f8786c41d0e90910aa81\"],\"id\":1}","status":true,"pending":false,"response":"{\"jsonrpc\":\"2.0\",\"id\":1,\"result\":\"0x62f1acd992d6812bcd3cf11d80bc5529a77aa02a789b882076fc0848ba379f51\"}"}
    //    */

    //   MDS.net.POST(
    //     "https://sepolia.infura.io/v3/05c98544804b478994665892aeff361c",
    //     JSON.stringify({
    //       jsonrpc: "2.0",
    //       method: "eth_sendRawTransaction",
    //       params: [signedTransaction],
    //       id: 1,
    //     }),
    //     function (resp) {
    //       MDS.log(JSON.stringify(resp));
    //       const transactionHash = resp.result;

    //       MDS.log("Transaction hash: " + transactionHash);
    //       // MDS.net.post("", )
    //     }
    //   );
    // });
  }
);
