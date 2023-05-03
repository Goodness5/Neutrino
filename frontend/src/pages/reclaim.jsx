import { useState, React, useEffect } from "react";
import estateAbi from "../utils/neutroAbi.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import styling from "../../styles/Home.module.css";

function reclaim() {
  const { address } = useAccount();
  const CONTRACT = "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f";
  const nftAddr = "0x34eB21Ba2F1CfB9Fb738e8AFA09AB1357fb1a6D1";
  // const [nftContractAdress, setNftContractAddress] = useState("");
  const [nftId, setNftId] = useState(null);

  const { config: config1 } = usePrepareContractWrite({
    address: CONTRACT,
    abi: estateAbi,
    functionName: "reclaimAmountPaid",
    args: [nftAddr, nftId],
  });

  const {
    data: reclaimData,
    isLoading: reclaimIsLoading,
    write: reclaim,
  } = useContractWrite(config1);

  const { data: createWaitData, isLoading: createWaitIsLoading } =
    useWaitForTransaction({
      data: reclaimData?.hash,

      onSuccess(data) {
        console.log("SUCCESSFULLY reclaimed Payment: ", data);
        alert("Succesfully Claimed");
      },

      onError(error) {
        console.log("Encountered error: ", error);
        alert("Encountered Error");
      },
    });

  useEffect(() => {
    if (reclaimData) {
      console.log(reclaimData);
    }
  }, [reclaimData]);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    reclaim?.();
  };

  return (
    <div>
      <div className={styling.exitclaim}>
        <form className={styling.form} onSubmit={handleSubmit2}>
          <h1>Enter property Details to reclaim.</h1>
          {/* <label className={styling.label}>Property Contract Address:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter property contract address"
            onChange={(e) => setNftContractAddress(e.target.value)}
          /> */}

          <br></br>
          <hr></hr>
          <hr></hr>

          <label className={styling.label}>Property ID:</label>
          <input
            className="form-input"
            type="number"
            placeholder="Enter property ID"
            onChange={(e) => setNftId(e.target.value)}
          />

          <button className={styling.buttonC} type="submit">
            {reclaimIsLoading || createWaitIsLoading
              ? "Reclaiming Payment..."
              : "Reclaim Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default reclaim;
