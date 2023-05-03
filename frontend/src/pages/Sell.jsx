import Discover from "../components/Buy/Discover";
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
import { FaPencilAlt, FcCancel } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { BsCheck2 } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Mint from "../components/MintForm";

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

  const [mintStatus, setMintStatus] = useState(false);
  const [DepositNftStatus, setDepositNFTStatus] = useState(false);
  const [CreateFractionStatus, setCreateFractionStatus] = useState(false);
  const [ApproveStatus, setApproveStatus] = useState(false);

  const [disabledMintStatus, setdisabledMintStatus] = useState(false);
  const [disabledDepositNftStatus, setdisabledDepositNFTStatus] =
    useState(false);
  const [disabledCreateFractionStatus, setdisabledCreateFractionStatus] =
    useState(false);
  const [disabledApproveStatus, setdisabledApproveStatus] = useState(false);

  const [open, setopen] = useState(false);
  const [mintFormOpen, setMintFormOpen] = useState(false);

  const handleDepositNftStatus = () => {
    setDepositNFTStatus(true);
    setdisabledCreateFractionStatus(true);
    setdisabledDepositNFTStatus(false);
  };
  const handleCreateFractionStatus = () => {
    setCreateFractionStatus(true);
    setdisabledApproveStatus(true);
    setdisabledCreateFractionStatus(false);
  };
  const handleApproveStatus = () => {
    setApproveStatus(true);
    setdisabledApproveStatus(false);
  };

  const handleClose = () => {
    setopen(false);
  };
  const handleOpen = () => {
    setopen(true);
  };

  const handleCancelMintForm = (prop) => {
    setMintStatus(prop);
    setMintFormOpen(false);
  };
  const handleMintFormOpen = () => {
    setMintFormOpen(true);
  };
  const handleMintFormProceed = (prop) => {
    setMintStatus(prop);
    setMintFormOpen(false);
    setdisabledDepositNFTStatus(true);
  };

  //wagmi interaction with deposit

  return (
    <div>
      <div>
        <h1>SELL PAGE</h1>
        <Button onClick={handleOpen}> Sell Property</Button>

        {open && (
          <Dialog open={open} onClose={!open} maxWidth="lg" fullWidth={true}>
            <div className="flex mx-auto justify-center h-auto lg:w-[70%] sm:w[200%]">
              <div className="lg:ml-[60px] lg:mr-[50px] justify-between w-10 xsm:hidden lg:block">
                <div className="mt-[60px] p-3 w-10 h-10 rounded-full text-center">
                  {mintStatus ? (
                    <BsCheck2 color="green" size={30} />
                  ) : (
                    <CiNoWaitingSign color="red" size={30} />
                  )}{" "}
                </div>
                <div className="mt-[130px] p-3 w-10 h-10 rounded-full text-center">
                  {DepositNftStatus ? (
                    <BsCheck2 color="green" size={30} />
                  ) : (
                    <CiNoWaitingSign color="red" size={30} />
                  )}{" "}
                </div>
                <div className="mt-[130px] p-3 w-10 h-10 rounded-full text-center">
                  {" "}
                  {CreateFractionStatus ? (
                    <BsCheck2 color="green" size={30} />
                  ) : (
                    <CiNoWaitingSign color="red" size={30} />
                  )}{" "}
                </div>
                <div className="mt-[130px] p-3 w-10 h-10 rounded-full text-center">
                  {ApproveStatus ? (
                    <BsCheck2 color="green" size={30} />
                  ) : (
                    <CiNoWaitingSign color="red" size={30} />
                  )}{" "}
                </div>
              </div>
              <div className="w-[50%] lg:h-[100%] xsm:w-[100%]">
                <div className="my-[18px] lg:w-[70%] xsm:w-[100%] lg:h-[150px] xsm:h-[300px] rounded-lg border flex py-4 ">
                  <div className="mx-auto flex my-auto w-[80%]">
                    <div className="w-[35px] mr-8 my-auto xsm:hidden lg:block">
                      <FaPencilAlt size={30} />
                    </div>
                    <div className="w-[100%]">
                      <h1 className=" text-2xl font-bold">
                        Mint The Property NFT
                      </h1>
                      <p className=" text-base">
                        Mint a property representation
                      </p>
                      <button
                        className="w-[100%] h-[50px] border-none rounded-lg my-2"
                        disabled={mintStatus}
                        onClick={handleMintFormOpen}
                        style={
                          mintStatus
                            ? { background: "grey" }
                            : { background: "#71DF82" }
                        }
                      >
                        Mint
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-[18px] lg:w-[70%] xsm:w-[100%] lg:h-[150px] xsm:h-[300px] rounded-lg flex py-4">
                  <div className="mx-auto flex my-auto w-[80%] border">
                    <div className="w-[35px] mr-8 my-auto xsm:hidden lg:block">
                      <FaPencilAlt size={30} />
                    </div>
                    <div className="w-[100%]">
                      <h1 className=" text-2xl font-bold">Deposit NFT</h1>
                      <p className=" text-base">
                        Deposit a property representation
                      </p>
                      <button
                        className="w-[100%] h-[50px] border-none bg-green-400 rounded-lg my-2"
                        disabled={!disabledDepositNftStatus}
                        onClick={handleDepositNftStatus}
                        style={
                          disabledDepositNftStatus
                            ? { background: "#71DF82" }
                            : { background: "grey" }
                        }
                      >
                        Deposit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-[18px] lg:w-[70%] xsm:w-[100%] xsm:h-[300px] lg:h-[150px] rounded-lg border flex py-4">
                  <div className="mx-auto flex my-auto w-[80%]">
                    <div className="w-[35px] mr-8 my-auto xsm:hidden lg:block">
                      <FaPencilAlt size={30} />
                    </div>
                    <div className="w-[100%]">
                      <h1 className=" text-2xl font-bold">Create Fraction</h1>
                      <p className=" text-base">Create a property fraction</p>
                      <button
                        className="w-[100%] h-[50px] border-none bg-green-400 rounded-lg my-2"
                        disabled={!disabledCreateFractionStatus}
                        onClick={handleCreateFractionStatus}
                        style={
                          disabledCreateFractionStatus
                            ? { background: "#71DF82" }
                            : { background: "grey" }
                        }
                      >
                        Create fraction
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-[18px] lg:w-[70%] xsm:w-[100%] lg:h-[150px] xsm:h-[300px] rounded-lg border flex py-4">
                  <div className="mx-auto flex my-auto w-[80%]">
                    <div className="w-[35px] mr-8 my-auto xsm:hidden lg:block">
                      <FaPencilAlt size={30} />
                    </div>
                    <div className="w-[100%]">
                      <h1 className=" text-2xl font-bold">Approve Fraction</h1>
                      <p className=" text-base">Approve Fraction Spending</p>
                      <button
                        className="w-[100%] h-[50px] border-none bg-green-400 rounded-lg my-2"
                        disabled={!disabledApproveStatus}
                        onClick={handleApproveStatus}
                        style={
                          disabledApproveStatus
                            ? { background: "#71DF82" }
                            : { background: "grey" }
                        }
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
        {mintFormOpen && (
          <Mint
            openMint={mintFormOpen}
            cancelMint={handleCancelMintForm}
            proceed={handleMintFormProceed}
          />
        )}
      </div>
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
    </div>
  );
};

export default Sell;
