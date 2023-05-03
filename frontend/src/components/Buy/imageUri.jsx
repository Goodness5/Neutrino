import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { neuNFT } from '../../utils/contractInfo';

const usePropertyImageUris = (tokenIds) => {
  const [imageUris, setImageUris] = useState([]);

  useEffect(() => {
    const fetchImageUris = async () => {
      const uris = await Promise.all(tokenIds.map(async (tokenId) => {
        try {
          const { data } = await useContractRead({
            address: neuNFT.address,
            abi: neuNFT.abi,
            functionName: 'tokenURI',
            functionParams: [tokenId],
          });

          const ipfsHash = data.replace('ipfs://', '');
          const uri = `https://ipfs.infura.io/ipfs/${ipfsHash}`;
          return uri;
        } catch (error) {
          console.error(error);
          return null;
        }
      }));

      setImageUris(uris);
    };

    fetchImageUris();
  }, [tokenIds]);

  return imageUris;
};


export default usePropertyImageUris;
