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
  const CONTRACT = "0xEB86d6F284b6dE1aC0AF20d04815Ea8c1F04c1eF";
  const nftAddr = "0x32F7a08bBE5Edd19C64d52c3E4C47676492AE696";
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
