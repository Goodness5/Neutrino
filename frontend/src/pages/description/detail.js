import DisplayNFT from "../../components/sell/DisplayNFT";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { neutrinoEstate } from "../../utils/contractInfo";

  
  
  
  const { id } = useRouter().query;
  const ID = Number(id) - 1;

  const [allProperties, setAllProperties] = useState();

//   const { data, isLoading, isError } = useContractRead({
//     address: "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f",
//     abi: neutrinoEstate.abi,
//     functionName: "getAllProperties",
//   });

//   useEffect(() => {
//     setAllProperties(data);
//   }, [allProperties]);



// export const descDetails = [

//     id: {allProperties?.[ID]},
//     imgUrl: '/house.jpg',
//     price:'1eth',
//     bathroom:'4',
//     bedroom: '3',
//     houseType:'duplex',
//     houseDesc:'Event organizers create an event on the platform and set the ticket prices, quantity, and other details.'
//   ,
  
// ];

// export const houseFeatures = [
//   {
//   PropertyType:'single',
//   yearBuilt:'1981',
//   Country:'Califonia',
//   HOAName:'7900 club',
//   FeeFrequency:'Monthly',
//   parkingspace:'2'
//   },
// ];

// export const nearBy = [
//   {
//     school: '/blockchain.png',
//     mall: 'Decentralization',
//     laundromat:'Our platform is fully decentralized, meaning that there are no central authorities or intermediaries controlling the ticket sales, transfers, or ownership',
//     bank:'',
//     store:'',
//     others:''
//   },
// ];

export const propertyValution = [
  {
    PropertyTypes:'Location rating',
    crimeLevel:'Content',
    ecologicalState:'1981',
    noiseLevel:'7800 club',
    infractureAssessment:'345'
},
];
