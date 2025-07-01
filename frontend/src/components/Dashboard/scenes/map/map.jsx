import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import GoogleMapReact from 'google-map-react';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationOnIcon from '@mui/icons-material/LocationOn';

let gymData = [
 {
    id: "1",
    name: " strength hub unisex gym",
    latitude: 20.035059482155926,
    longitude: 74.48949416179856 
  },
  {
    id: "2",
    name: "AS GYM",
    latitude: 20.04268896809158,
    longitude: 74.47338183011605 
  },
  {
    id: "3",
    name: "Vivekanand Nagar Colony Public Park - 1 (GYM)",
    latitude: 20.043011498035217,
    longitude: 74.46977694131398 ,
  },
  {
    id: "4",
    name: "All in one fitness Gym",
    latitude: 20.041076308438214,
    longitude: 74.47685797288949 ,
  },
    {
    id: "5",
    name: "Hi5 fitness Club",
    latitude: 20.046064376463768,
    longitude: 74.4851955198947 
  },
  {
    id: "6",
    name: "perdeshpura talim sangha",
    latitude: 20.046064376463768,
    longitude: 74.48880040869679 
  },
  {
    id: "7",
    name: " lakhpati fitness yeola",
    latitude: 20.04880580094296,
    longitude: 74.49566686355789 
  },
  {
    id: "8",
    name: "shivaji fitness and health",
    latitude: 20.044290488060927,
    longitude: 74.49086034515511 
  },
  {
    id: "9",
    name: "Swimming Pool",
    latitude: 20.03916158723019,
    longitude: 74.489370554998 
  },
  {
    id: "10",
    name: "Rakesh gym",
    latitude: 18.673215816897468,
    longitude: 73.73143064935894
  },
  {
    id: "11",
    name: "RB FITNESS",
    latitude: 18.673378441947293,
    longitude: 73.73276102507101
  },
  {
    id: "12",
    name: "Metallic Gym",
    latitude: 18.682874311785078, 
    longitude: 73.83663205225925
  },
  {
    id: "13",
    name: "EnerGym - A High Energy Workout Zone",
    latitude: 18.663196785312294, 
    longitude: 73.80739082835603
  },
  {
    id: "14",
    name: "Fitness freak",
    latitude: 18.6165114532554,
    longitude: 73.908337143004
  },
  {
    id: "15",
    name: "Fitness Mantras Porwal Branch",
    latitude: 18.614640629387537,  
    longitude: 73.9115987090382
  },
  {
    id: "16",
    name: "Power X Gym",
    latitude: 18.613783004627425, 
    longitude: 73.91601294187384
  },
  {
    id: "17",
    name: "The Muscle Studio",
    latitude: 18.60926851779138,  
    longitude: 73.91172140786396
  },
  {
    id: "18",
    name: "Ample fitness center",
    latitude: 18.61093604489059,  
    longitude: 73.91777247116428
  },
  {
    id: "19",
    name: "FitWorld",
    latitude: 18.606495919145427,  
    longitude: 73.90990050336505
  },
  {
    id: "20",
    name: "Om Fitness",
    latitude: 18.598485027642027,  
    longitude: 73.9331344358608
  },
  {
    id: "21",
    name: "Anytime Fitness Pune | Gym Near Me Viman Nagar",
    latitude: 18.576302913167908,  
    longitude: 73.90951414912651
  },
  {
    id: "22",
    name: "Curl Fitness",
    latitude: 18.594791357061617,  
    longitude: 73.937178090913
  },
  
];

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [gyms, setGyms] = useState(gymData);
  const [selectedGym, setSelectedGym] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [distance, setDistance] = useState(40);

  useEffect(() => {
    const successCallback = (position) => {
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    const errorCallback = (error) => {
      console.log("Error Getting Location:" + error.message);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []); // Empty dependency array to mimic componentDidMount behavior
  
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => { return deg * (Math.PI / 180) }

    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  } 

  const handleSearch = () => {
    // Filter gyms based on search query and distance
    const filteredGyms = gymData.filter(gym =>
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      getDistanceFromLatLonInKm(latitude, longitude, gym.latitude, gym.longitude) < distance
    );
    // Update gyms state with filtered gyms
    setGyms(filteredGyms);
  };

  const LocationMarker = () => (
    <LocationSearchingIcon color="primary" style={{ position: 'absolute', transform: 'translate(-50%, -50%)',fontSize: 40 }} />
  );

  const valuetext = (value) => `${value}km`;

  return (
    <div>
      <div style={{ backgroundColor: "#1f2a40" }}>
        <Typography variant='h4' style={{ textAlign: "center", color: "white" }}>
          G Y M F I N D E R
        </Typography>
        <TextField
          label="Search for academy.."
          variant='outlined'
          style={{ width: "100%" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Typography style={{ color: "white" }}>
            Distance:
          </Typography>
          <Slider
            style={{ width: "75%" }}
            value={distance}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={5}
            min={0}
            max={50}
            onChange={(event, value) => setDistance(value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Button variant='contained' style={{ width: "50%", alignItems: "center" }} onClick={handleSearch}>
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>

      <div style={{ backgroundColor: "cyan", height: '80vh', position: 'relative' }}>
        <GoogleMapReact
          onClick={() => { setSelectedGym(null) }}
          bootstrapURLKeys={{ key: "AIzaSyDOiKYcfB-ayCqi3aIGR7DF4v2IFR0dpd4" }}
          defaultCenter={{
            lat: latitude || 0,
            lng: longitude || 0
          }}
          defaultZoom={14}
          center={{ lat: latitude || 0, lng: longitude || 0 }}
        >
          {gyms.map((gym) => (
            <LocationOnIcon
              key={gym.id}
              color="secondary"
              lat={gym.latitude}
              lng={gym.longitude}
              text={gym.name}
              onClick={() => setSelectedGym(gym)}
              style={{ fontSize: 50 }}
            />
          ))}
          {selectedGym && (
            <div style={{ position: 'absolute', top: selectedGym.latitude, left: selectedGym.longitude, backgroundColor: "blue", padding: 5, zIndex: 100 }}>
              <Typography>{selectedGym.name}</Typography>
            </div>
          )}
          <LocationMarker lat={latitude || 0} lng={longitude || 0} />
        </GoogleMapReact>
      </div>                       
    </div>
  );
};

export default Map;
