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

function claimprop() {
  const { address } = useAccount();
  const CONTRACT = "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f";
  const [nftContractAdress, setNftContractAddress] = useState("");
  const [nftId, setNftId] = useState(null);
  const [status, setStatus] = useState(null);

  const { config: config1 } = usePrepareContractWrite({
    address: CONTRACT,
    abi: estateAbi,
    functionName: "claimPaymentOnProperty",
    args: [nftContractAdress, nftId],
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

  //   ===============================================
  //=================================================

  const { config: config2 } = usePrepareContractWrite({
    address: CONTRACT,
    abi: estateAbi,
    functionName: "exitProperty",
    args: [nftContractAdress, nftId, status],
  });

  const {
    data: exitData,
    isLoading: exitIsLoading,
    write: exit,
  } = useContractWrite(config2);

  const { data: exitWaitData, isLoading: exitWaitIsLoading } =
    useWaitForTransaction({
      data: exitData?.hash,

      onSuccess(data) {
        console.log("SUCCESSFULLY Exited: ", data);
        alert("Succesfully Exited");
      },

      onError(error) {
        console.log("Encountered error: ", error);
        alert("Encountered Error");
      },
    });

  useEffect(() => {
    if (exitData) {
      console.log(exitData);
    }
  }, [exitData]);

  const handleSubmit3 = (e) => {
    e.preventDefault();

    exit?.();
  };

  return (
    <div>
      <div className={styling.exitclaim}>
        <form className={styling.form} onSubmit={handleSubmit2}>
          <h2>Enter Property Details to Claim Payment.</h2>
          <label className={styling.label}>Property Contract Address:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter property contract address"
            onChange={(e) => setNftContractAddress(e.target.value)}
          />

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

          <button className={styling.button} type="submit">
            {reclaimIsLoading || createWaitIsLoading
              ? "Reclaiming Payment..."
              : "Reclaim Payment"}
          </button>
        </form>

        {/* 
        ==========================================================
        ==========================================================
        ===========================================================
    
      */}

        <form className={styling.form} onSubmit={handleSubmit3}>
          <h2>Fill in Details Below To Exited Property.</h2>
          <label className={styling.label}>Property Contract Address:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter property contract address"
            onChange={(e) => setNftContractAddress(e.target.value)}
          />

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

          <br></br>
          <hr></hr>
          <hr></hr>

          <label className={styling.label}>Property Status:</label>
          <input
            className="form-input"
            type="number"
            placeholder="sale (0) or rent (1)"
            onChange={(e) => setStatus(e.target.value)}
          />

          <button className={styling.button} type="submit">
            {exitIsLoading || exitWaitIsLoading
              ? "Exiting Property..."
              : "Exit Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default claimprop;
