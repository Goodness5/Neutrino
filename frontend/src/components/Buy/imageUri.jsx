import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { neuNFT } from '../../utils/contractInfo';

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
