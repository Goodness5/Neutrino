import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { neuNFT, neutrinoEstate } from "../../utils/contractInfo";

const DisplayNFT = ({ id }) => {
  const [metadata, setMetadata] = useState("");
  const [imageURL, setImageURL] = useState("");

  const {
    data: tokenURI,
    isLoading: loadData,
    isError: errorData,
  } = useContractRead({
    address: neuNFT.address,
    abi: neuNFT.abi,
    functionName: "tokenURI",
    args: [id],
  });

  useEffect(() => {
    nft(tokenURI);
  }, [tokenURI, imageURL]);

  const nft = async (uri) => {
    const url = `https://ipfs.io/ipfs/${uri}`;
    await axios.get(url).then((res) => setMetadata(res.data));
    setImageURL(metadata?.image);
    console.log(url);
  };

  console.log(tokenURI);
  console.log(metadata?.image);
  console.log(imageURL);

  return (
    <div className="absolute inset-0">
      <Image className="rounded-lg" src={imageURL} alt="bg img" layout="fill" />
    </div>
  );
};

export default DisplayNFT;
