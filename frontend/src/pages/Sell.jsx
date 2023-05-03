import Discover from "@/components/Buy/Discover";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { neutrinoEstate } from "../utils/contractInfo";

const Sell = () => {
  const { address } = useAccount();
  const { id } = useRouter().query;
  const ID = Number(id) - 1;

  const [allProperties, setAllProperties] = useState();

  const { data, isLoading, isError } = useContractRead({
    address: "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f",
    abi: neutrinoEstate.abi,
    functionName: "getAllProperties",
  });

  useEffect(() => {
    setAllProperties(data);
  }, [allProperties]);

  const [nftAddress, setNftAddress] = useState("");
  const [nftId, setNftId] = useState("");

  const { config } = usePrepareContractWrite({
    address: "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f",
    abi: neutrinoEstate.abi,
    functionName: "RetrievePropertyOnDefault",
    args: [nftAddress, nftId],
  });
  const {
    data: writeData,
    isLoading: loadData,
    isSuccess,
    write,
  } = useContractWrite(config);

  const {
    data: waitData,
    isLoading: waitLoading,
    isError: waitError,
  } = useWaitForTransaction({
    hash: writeData?.hash,

    onSuccess(data) {
      // toast.success(`Successfully Retrieved`);
      console.log(`Successful: ${data}`);
    },

    onError(error) {
      // toast.error(`Error: ${error}`);
      console.log(`Error: ${error}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <div className="flex flex-col items-center">
        <h1>Your Properties</h1>
        <div className="grid grid-cols-3">
          {allProperties?.map((item) => {
            if (item[0] == address) {
              return (
                <div key={item} className="m-8">
                  <Image
                    src="/homeassets/Photo3.png"
                    alt="image"
                    width={300}
                    height={200}
                    className="rounded-md"
                  />
                  <p>
                    Property Status:{" "}
                    {item?.[2] == 0 ? <>For Sale</> : <>For Rent</>}
                  </p>
                  <p>I.D.: {String(item?.[3])}</p>
                  <p>Price: {String(item?.[6] / 10 ** 18)} ETH</p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="divide-2 divide-black">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-[30%] mx-auto p-4 gap-4 "
        >
          <label htmlFor="nft">NFT Contract Address: </label>
          <input
            type="text"
            value={nftAddress}
            id="nft"
            onChange={(e) => setNftAddress(e.target.value)}
          />
          <label htmlFor="id">NFT ID: </label>
          <input
            type="text"
            value={nftId}
            id="id"
            onChange={(e) => setNftId(e.target.value)}
          />
          <button type="submit" disabled={!nftAddress || !nftId}>
            {loadData || waitLoading ? "Retrieving" : "Retrieve"}
          </button>
        </form>
      </div>

      <Discover />
    </div>
  );
};

export default Sell;
