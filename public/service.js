MDS.init((msg) => {
  if (msg.event === "inited") {
    MDS.log("Backend service ready.");
  }
});
