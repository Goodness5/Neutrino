import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useContractRead } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropertyDetails from "./Propertydetails";
import { neutrinoEstate, neuNFT } from "../../utils/contractInfo.js";


function useTokenUris(propertiesData, neuNFT) {
  const [tokenUris, setTokenUris] = useState([]);

  useEffect(() => {
    async function generateTokenUris() {
      if (propertiesData) {
        const promises = propertiesData.map(async (property) => {
          const tokenId = property.nftId;
          const { data } = await useContractRead({
            address: neuNFT.address,
            abi: neuNFT.abi,
            functionName: "tokenURI",
            functionParams: [tokenId],
            onError: (error) => {
              console.error(error);
              toast.error("Error loading image uri!");
            },
          });
          return data;
        });
        const uris = await Promise.all(promises);
        setTokenUris(uris);
      }
    }
    generateTokenUris();
  }, [propertiesData, neuNFT]);

  return tokenUris;
}

const Properties = () => {
  const { data: propertiesData, isError, isLoading } = useContractRead({
    // address: neutrinoEstate.address,
    address: '0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f',
    abi: neutrinoEstate.abi,
    functionName: 'getAllProperties',
    onError: (error) => {
      console.error(error);
      toast.error("Error loading properties!");
    },
    onLoading: () => {
      toast.info("Loading properties...");
    },
    onSuccess: () => {
      toast.success("Properties loaded successfully!");
    }
  });


  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col gap-8 px-8 w-full my-[2rem]">
        <div className="flex flex-col items-center justify-center">
          <span>
            <Image
              src="/footer assets/rec.png"
              alt="line"
              width={100}
              height={3}
            />
          </span>
          <h1 className="font-bold text-3xl">Explore our neighbourhoods</h1>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          {propertiesData && (
            <React.Fragment>
              {imageUris.map((imageUri, index) => {
                const property = propertiesData[index];

                return (
                  <div key={index} className="flex-1">
                    <PropertyDetails
                      img={imageUri}
                      title={property.title}
                      text={property.text}
                      price={property.price}
                    />
                    <button className="p-4 bg-black text-white">Buy</button>
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;

