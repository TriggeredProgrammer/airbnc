import { useParams } from "react-router-dom";
import Header from "../Header";

export default function BookingPage() {
  const { id } = useParams();
  return (
    <div>
      <Header />
      my bookings page :{id}
    </div>
  );
}
