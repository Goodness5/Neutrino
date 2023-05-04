import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { neuNFT, neutrinoEstate } from "../../utils/contractInfo";
import DisplayNFT from "../sell/DisplayNFT";

const HomeGallery = () => {
  const [allProperties, setAllProperties] = useState();

  const { data, isLoading, isError } = useContractRead({
    address: "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f",
    abi: neutrinoEstate.abi,
    functionName: "getAllProperties",
  });

  // const {
  //   data: tokenURI,
  //   isLoading: loadData,
  //   isError: errorData,
  // } = useContractRead({
  //   address: neuNFT.address,
  //   abi: neuNFT.abi,
  //   functionName: "tokenURI",
  //   args: [1],
  // });

  useEffect(() => {
    setAllProperties(data);
  }, [allProperties]);

  // const nft = async (uri) => {
  //   const url = `https://ipfs.io/ipfs/${uri}`;
  //   await axios.get(url).then((res) => setMetadata(res.data));
  //   setImageURL(metadata.image);
  //   console.log(url);
  // };

  console.log(allProperties);

  return (
    <div className="flex flex-col gap-8 px-8 w-full my-[2rem]">
      <div className="flex flex-col items-center justify-center">
        <span>
          <Image
            src="/homeassets/photo.png"
            alt="line"
            width={100}
            height={3}
          />
        </span>
        <h1 className="font-bold text-3xl text-center">
          Explore our neighbourhoods
        </h1>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {allProperties?.map((item) => {
          return (
            <Link href={`/home/${item?.[3]}`} key={item[3]}>
              <div className="relative h-[15rem] w-[100%] hover:cursor-pointer">
                <DisplayNFT id={item?.[3]} />
                <div className="relative z-10 h-full flex flex-col items-start justify-end gap-4">
                  <span className="p-[1rem] bg-white w-[50%]">
                    <h1 className="text-xl font-bold">
                      <span>Price: </span>
                      {String(item?.[6]) / 10 ** 18} ETH
                    </h1>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeGallery;
