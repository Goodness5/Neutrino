import {React, useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import main from './upload/upload.mjs';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi'
import NFTAbi from '../utils/NftAbi.json';

const MintForm = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setTitle] = useState('');
    const [description, setPropertyDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setlocation] = useState('');
    const [file, setFile] = useState('');
    const [Plot, setPlot] = useState('');
    const [Room, setRoom] = useState('');
    const [AboutBuilding, setAboutBuilding] = useState('');
    const [propertyType, setpropertyType] = useState('');
    const [County, setCounty] = useState('');
    const [yearBuilt, setyearBuilt] = useState('');
    const [BathroomFeatures, setBathroomFeatures] = useState('');
    const [HOAname, setHOAname] = useState('');
    const [HOAfee, setHOAfee] = useState('');
    const [feeFrequency, setfeeFrequency] = useState('');
    const [parkingSpace, setparkingSpace] = useState('');
    const [NearbyLocation, setNearbyLocation] = useState('');
    const [CrimeLevel, setCrimeLevel] = useState('');
    const [Ecologystate, setEcologystate] = useState('');
    const [Noiselevel, setNoiselevel] = useState('');
    const [Infrastructure, setInfrastructure] = useState('');

    const [PropertyURI, setPropertyURI] = useState('');
    const [isLoading, setIsloading] = useState(false);

  
    const handleProceed = async () => {
      setIsloading(true);
      const URI = await main(file, name, description, location, Plot, Room, AboutBuilding, price, propertyType, County, yearBuilt, BathroomFeatures, HOAname, HOAfee, feeFrequency, parkingSpace, NearbyLocation, CrimeLevel, Ecologystate, Noiselevel, Infrastructure);
      setPropertyURI(URI.ipnft);
      console.log(URI.ipnft);
      if(URI.ipnft){
        safeMint()
      }     
      };

    const handleClose = () => {
        props.cancelMint(false);
      };
    
      const handleFile = async (e) =>{
       setFile(e.target.files[0]);
      }
  
      //Wagmi Interactions 
      const { config : mintConfig } = usePrepareContractWrite({
        address: '0x32F7a08bBE5Edd19C64d52c3E4C47676492AE696',
        abi: NFTAbi,
        functionName: 'safeMint',
        args:[PropertyURI, "0x1f6feEEd3Fb9696A5FB3a6aB78B5B3c7E1eb2f5f"]
      })
      const { data : mintWaitData, isLoading: isloadingMint, isSuccess, write: safeMint } = useContractWrite(mintConfig);

      const {data: relWaitData, isLoading: releaseDataWaitLoading, isSuccess : releaseDataSuccess} = useWaitForTransaction({
        hash: mintWaitData?.hash,
        onSuccess(data) {
          setIsloading(false);
          props.proceed(true);
          console.log(Number(data.logs[0].topics[3]));
        },
        onError(error) {
        },
      }) 



    return (
    <div>
        <Dialog open={props.openMint} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Specify the nature of the Property, be as detailed as possible.
          </DialogContentText>
          <TextField autoFocus margin="dense" label="Title" type="text" fullWidth inputProps={{ maxLength: 30 }} value={name} onChange={(e) =>setTitle(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Description" type="text" fullWidth  value={description} rows={4} multiline  onChange={(e) =>setPropertyDescription(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Price" type="text" fullWidth  value={price} onChange={(e) =>setPrice(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Location" type="text" fullWidth  value={location} onChange={(e) =>setlocation(e.target.value)}/>      
          <TextField autoFocus margin="dense" label="Plot" type="text" fullWidth  value={Plot} onChange={(e) =>setPlot(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Room" type="text" fullWidth  value={Room} onChange={(e) =>setRoom(e.target.value)}/>
          <TextField autoFocus margin="dense" label="AboutBuilding" type="text" fullWidth  rows={4} multiline value={AboutBuilding} onChange={(e) =>setAboutBuilding(e.target.value)}/>
          <TextField autoFocus margin="dense" label="propertyType" type="text" fullWidth  value={propertyType} onChange={(e) =>setpropertyType(e.target.value)}/>
          <TextField autoFocus margin="dense" label="County" type="text" fullWidth  value={County} onChange={(e) =>setCounty(e.target.value)}/>
          <TextField autoFocus margin="dense" label="yearBuilt" type="text" fullWidth  value={yearBuilt} onChange={(e) =>setyearBuilt(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Location" type="text" fullWidth  value={BathroomFeatures} onChange={(e) =>setBathroomFeatures(e.target.value)}/>
          <TextField autoFocus margin="dense" label="HOAname" type="text" fullWidth  value={HOAname} onChange={(e) =>setHOAname(e.target.value)}/>
          <TextField autoFocus margin="dense" label="HOAfee" type="text" fullWidth  value={HOAfee} onChange={(e) =>setHOAfee(e.target.value)}/>
          <TextField autoFocus margin="dense" label="feeFrequency" type="text" fullWidth  value={feeFrequency} onChange={(e) =>setfeeFrequency(e.target.value)}/>
          <TextField autoFocus margin="dense" label="parkingSpace" type="text" fullWidth  value={parkingSpace} onChange={(e) =>setparkingSpace(e.target.value)}/>
          <TextField autoFocus margin="dense" label="NearbyLocation" type="text" fullWidth  value={NearbyLocation} onChange={(e) =>setNearbyLocation(e.target.value)}/>
          <TextField autoFocus margin="dense" label="CrimeLevel" type="text" fullWidth  value={CrimeLevel} onChange={(e) =>setCrimeLevel(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Ecologystate" type="text" fullWidth  value={Ecologystate} onChange={(e) =>setEcologystate(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Noiselevel" type="text" fullWidth  value={Noiselevel} onChange={(e) =>setNoiselevel(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Infrastructure" type="text" fullWidth  value={Infrastructure} onChange={(e) =>setInfrastructure(e.target.value)}/>
    <TextField
              type="file"
              variant="outlined"
              onChange={handleFile}
            /> 
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleProceed}>{isLoading ? "Processing" : "Proceed"}</Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}

export default MintForm