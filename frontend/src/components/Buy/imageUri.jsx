import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { neuNFT } from '../../utils/contractInfo';

const usePropertyImageUri = (tokenId) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImageUri = async () => {
      try {
        const { data } = await useContractRead({
          address: neuNFT.address,
          abi: neuNFT.abi,
          functionName: 'tokenURI',
          functionParams: [tokenId],
        });

        const ipfsHash = data.replace('ipfs://', '');
        const uri = `ttps://ipfs.infura.io/ipfs/${ipfsHash}`;

        setImageUri(uri);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageUri();
  }, [tokenId]);

  return imageUri;
};

export default usePropertyImageUri;
