import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { neutrinoEstate } from "../../utils/contractInfo";

const Property = () => {
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

  console.log(allProperties);
  return (
    <div className="flex flex-col items-center">
      <h1>Property Details</h1>
      <div className="p-4 w-[40%] border-2 border-black">
        <Image
          src="/homeassets/Photo2.png"
          alt="image"
          width={350}
          height={200}
          className="rounded-md"
        />
        <p>Owner: {allProperties?.[ID]?.[0]}</p>
        <p>Contract Address: {allProperties?.[ID]?.[1]}</p>
        <p>
          Property Status:{" "}
          {allProperties?.[ID]?.[2] == 0 ? <>For Sale</> : <>For Rent</>}
        </p>
        <p>I.D.: {String(allProperties?.[ID]?.[3])}</p>
        <p>Price: {String(allProperties?.[ID]?.[6] / 10 ** 18)} ETH</p>
        <p>Supply: {String(allProperties?.[ID]?.[7])}</p>
        <p>
          Buyer:{" "}
          {allProperties?.[ID]?.[9] ==
          "0x0000000000000000000000000000000000000000" ? (
            <>0x0</>
          ) : (
            allProperties?.[ID]?.[9]
          )}
        </p>
        <p>Amount Paid: {String(allProperties?.[ID]?.[10])} ETH</p>
        <p>Rented: {allProperties?.[ID]?.[12] == true ? <>YES</> : <>NO</>}</p>
        <p>Sold: {allProperties?.[ID]?.[11] == true ? <>YES</> : <>NO</>}</p>
      </div>
    </div>
  );
};

export default Property;
