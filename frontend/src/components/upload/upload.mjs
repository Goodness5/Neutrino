import { NFTStorage, File } from 'nft.storage'
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhjNDE5NjU3RGJkRTdBYzA2YTBBM2IwQjA2RThlNkU3REI3MmU3NTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjI2MTE2MTgwNSwibmFtZSI6Ik1ldGFkYXRhIENyZWF0ZSJ9.Rd-9etvKdQPicKsaT2A6YNonD8f-FItu-_BfHrVM6Gk'
async function storeNFT(image, name, description, Location, Plot, Room, AboutBuilding, Price, propertyType, County, yearBuilt, BathroomFeatures, HOAname, HOAfee, feeFrequency, parkingSpace, NearbyLocation, CrimeLevel, Ecologystate, Noiselevel, Infrastructure) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    return nftstorage.store({
        image,
         name, description, Location, Plot, Room, AboutBuilding, Price, propertyType, County, yearBuilt, BathroomFeatures, HOAname, HOAfee, feeFrequency, parkingSpace, NearbyLocation, CrimeLevel, Ecologystate, Noiselevel, Infrastructure
    });
}
async function main(image, name, description, Location, Plot, Room, AboutBuilding, Price, propertyType, County, yearBuilt, BathroomFeatures, HOAname, HOAfee, feeFrequency, parkingSpace, NearbyLocation, CrimeLevel, Ecologystate, Noiselevel, Infrastructure) {
    const result = await storeNFT(image, name, description, Location, Plot, Room, AboutBuilding, Price, propertyType, County, yearBuilt, BathroomFeatures, HOAname, HOAfee, feeFrequency, parkingSpace, NearbyLocation, CrimeLevel, Ecologystate, Noiselevel, Infrastructure)
    return(result)
}

export default main;