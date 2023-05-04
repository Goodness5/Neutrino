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
  const CONTRACT = "0xEB86d6F284b6dE1aC0AF20d04815Ea8c1F04c1eF";
  const nftAddr = "0x32F7a08bBE5Edd19C64d52c3E4C47676492AE696";
  // const [nftContractAdress, setNftContractAddress] = useState("");
  const [nftId, setNftId] = useState(null);
  const [status, setStatus] = useState(null);

  const { config: config1 } = usePrepareContractWrite({
    address: CONTRACT,
    abi: estateAbi,
    functionName: "claimPaymentOnProperty",
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

  //   ===============================================
  //=================================================

  const { config: config2 } = usePrepareContractWrite({
    address: CONTRACT,
    abi: estateAbi,
    functionName: "exitProperty",
    args: [nftAddr, nftId, status],
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
        

          <label className={styling.label}>Property ID:</label>
          <input
            className="form-input"
            type="number"
            placeholder="Enter property ID"
            onChange={(e) => setNftId(e.target.value)}
          />

          <button className={styling.buttonC} type="submit">
            {reclaimIsLoading || createWaitIsLoading
              ? "Claiming Payment..."
              : "Claim Payment"}
          </button>
        </form>

          <br />
          <br />
        {/* 
        ==========================================================
        ==========================================================
        ===========================================================
    
      */}

        <form className={styling.form} onSubmit={handleSubmit3}>
          <h2>Fill in Details Below To Remove Property.</h2>
          
          <hr></hr>

          <label className={styling.label}>Property ID:</label>
          <input
            className="form-input"
            type="number"
            placeholder="Enter property ID"
            onChange={(e) => setNftId(e.target.value)}
          />

          <br></br>
         

          <label className={styling.label}>Property Status:</label>
          <input
            className="form-input"
            type="number"
            placeholder="sale (0) or rent (1)"
            onChange={(e) => setStatus(e.target.value)}
          />

          <button className={styling.buttonC} type="submit">
            {exitIsLoading || exitWaitIsLoading
              ? "Removing Property..."
              : "Remove Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default claimprop;
