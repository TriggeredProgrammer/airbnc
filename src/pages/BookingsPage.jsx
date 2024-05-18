import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <AccountNav />
      <div>
        this is me
      </div>
    </div>
  );
}
