import Discover from "../components/Buy/Discover";
import Image from "next/image";
import { useRouter } from "next/router";
import estateAbi from "../utils/neutroAbi.json";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styling from "../../styles/Home.module.css";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// import estateAbi from "../utils/neutroAbi.json";
import { neuNFT, neutrinoEstate } from "../utils/contractInfo";
// import styling from "../../styles/Home.module.css";
import { FaPencilAlt, FcCancel } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { BsCheck2 } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Mint from "../components/MintForm";
import DisplayNFT from "../components/sell/DisplayNFT";

const Sell = () => {
  const { address } = useAccount();
  const { id } = useRouter().query;
  const ID = Number(id) - 1;

  const [allProperties, setAllProperties] = useState();
  // const { address } = useAccount();
  const CONTRACT = "0xEB86d6F284b6dE1aC0AF20d04815Ea8c1F04c1eF";
  const nftAddr = "0x32F7a08bBE5Edd19C64d52c3E4C47676492AE696";
  // const [nftContractAdress, setNftContractAddress] = useState("");
  const [nftIdd, setNftIdd] = useState(null);
  const [status, setStatus] = useState(null);

  const { config: config1 } = usePrepareContractWrite({
    address: CONTRACT,
    abi: estateAbi,
    functionName: "claimPaymentOnProperty",
    args: [nftAddr, nftIdd],
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
    args: [nftAddr, nftIdd, status],
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

  //============================
  //===========================

  const { data, isLoading, isError } = useContractRead({
    address: neutrinoEstate.address,
    abi: neutrinoEstate.abi,
    functionName: "getAllProperties",

    onSuccess(data) {
      toast.success(`Properties Fetched Successfully`);
    },
  });

  useEffect(() => {
    setAllProperties(data);
  }, [allProperties]);

  const [nftId, setNftId] = useState("");

  const {
    config,
    isError: writeError,
    error,
  } = usePrepareContractWrite({
    address: neutrinoEstate.address,
    abi: neutrinoEstate.abi,
    functionName: "RetrievePropertyOnDefault",
    args: [neuNFT.address, nftId],
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
      toast.success(`Successfully Retrieved`);
      console.log(`Successful: ${data}`);
    },

    onError(error) {
      toast.error(`Error: ${error}`);
      console.log(`Error: ${error}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.warning(`Is this property rented?`);
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
        <ToastContainer />
        <div className="flex flex-col items-center">
          <h1>Your Properties</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {allProperties?.map((item) => {
              if (item[0] == address) {
                return (
                  <div
                    key={item?.[3]}
                    className="m-8 shadow-xl rounded-lg pb-4"
                  >
                    <DisplayNFT id={item?.[3]} width={300} height={200} />
                    <div className="flex flex-col items-center gap-4">
                      <p>
                        Property Status:{" "}
                        {item?.[2] == 0 ? <>For Sale</> : <>For Rent</>}
                      </p>
                      <p>I.D.: {String(item?.[3])}</p>
                      <p>Price: {String(item?.[6] / 10 ** 18)} ETH</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="shadow-2xl rounded-md w-[90%] md:w-[60%] lg:w-[30%] mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center p-4 gap-4"
          >
            <h2>Retrieve Property</h2>

            <label htmlFor="id">NFT ID: </label>
            <input
              className="p-4 rounded-md border-2"
              type="text"
              value={nftId}
              id="id"
              onChange={(e) => setNftId(e.target.value)}
            />
            <button
              type="submit"
              disabled={!nftId}
              className="p-4 rounded-md border-2 w-[55%]"
              style={
                !nftId
                  ? { backgroundColor: "grey" }
                  : {
                      backgroundColor: "#00b4a2",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
                    }
              }
            >
              {loadData || waitLoading ? "Retrieving" : "Retrieve"}
            </button>
            {/* {writeError && <div>{error}</div>} */}
          </form>
        </div>

        <Discover />
      </div>

      <div className={styling.exitclaim}>
        <form className={styling.form} onSubmit={handleSubmit2}>
          <h2>Enter Property Details to Claim Payment.</h2>
        

          <label className={styling.label}>Property ID:</label>
          <input
            className="form-input"
            type="number"
            placeholder="Enter property ID"
            onChange={(e) => setNftIdd(e.target.value)}
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
            onChange={(e) => setNftIdd(e.target.value)}
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
};

export default Sell;
