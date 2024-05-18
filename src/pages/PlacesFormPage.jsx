import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import Header from "../Header";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const{id}=useParams();
  console.log({id});
  const [title, setTitle] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

   useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuest(data.maxGuest);
       setPrice(data.price);
    });
  }, [id]);



  function inputDescription(text) {
    return <p className="text-gray-500 text-sm my-3">{text}</p>;
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuest,price
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } 
    else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }


  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="m-2 p-2">
      <Header />
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="title, for example: my lovely appartment"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        {preInput("Address", "Address to your place")}
        <input
          type="address"
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        {/* Photos section */}
        {preInput("Photos", "more=better")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {/* Description */}
        {preInput("Description", "Write about your place here")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {/* Perks start from here */}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid:cols-6 cursor-pointer ">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra info", "House rules and others")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        {preInput(
          "Check in&out times",
          "add check in and check out times, remember to have sime time wondow for cleaning the room between the guests"
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max guests</h3>
            <input
              type="number"
              placeholder="1"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              placeholder="1"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
