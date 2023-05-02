import Image from "next/image";
import React from "react";
import { useContractRead } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropertyDetails from "./Propertydetails";
import { neutrinoEstate, neuNFT } from "../../utils/contractInfo.js";

const Properties = () => {
  const { data: propertiesData, isError, isLoading } = useContractRead({
    address: neutrinoEstate.address,
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

  const getPropertyImageUri = async (tokenId) => {
    const { data, isError, isLoading } = await useContractRead({
      address: neuNFT.address,
      abi: neuNFT.abi,
      functionName: 'tokenURI',
      functionParams: [tokenId],
      onError: (error) => {
        console.error(error);
        toast.error("Error loading image uri!");
      },
      onLoading: () => {
        toast.info("Loading properties...");
      },
      onSuccess: () => {
        toast.success("Image uri loaded successfully!");
      }
    });

    if (!isLoading && !isError) {
      return data;
    }
  };

  if (isError) {
    return (
      <div>
        <ToastContainer />
        <h1>There was an error loading properties. Please try again later.</h1>
      </div>
    );
  }

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
          {propertiesData && propertiesData.map(async (property, index) => {
            const tokenId = property.nftId;
            const imageUri = await getPropertyImageUri(tokenId);

            return (
              <div key={index} className="flex-1">
                <PropertyDetails
                  img={imageUri}
                  title={property.title}
                  text={property.text}
                  price={property.price}
                  propertyStatus={property.propertyStatus}
                  isRented={property.isRented}
                  isSold={property.isSold}
                />
                <button className="p-4 bg-black text-white">Buy</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Properties;









  // { img: "Photo1", title: "Chicago", text: "Illinois" },
    // { img: "Photo2", title: "Boston", text: "Massachusetts" },
    // { img: "Photo3", title: "San Francisco", text: "California" },
    // { img: "Photo4", title: "Washington, D.C.", text: "USA" },
    // { img: "Photo5", title: "New York City", text: "New York" },
    // { img: "Photo7", title: "Los Angeles", text: "California" },
    // { img: "Photo8", title: "Miami", text: "Florida" },