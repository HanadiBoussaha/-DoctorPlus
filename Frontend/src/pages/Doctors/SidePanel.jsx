import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom

import useFetchData from "./../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const SidePanel = () => {
  const { id } = useParams();
  const { data } = useFetchData(`http://localhost:5000/api/v1/doctors/${id}`);
  const doctors = data?.data ?? [];
  const { timeSlots, ticketPrice } = doctors;

  const handleBookingClick = () => {
    // Gérer la navigation ici, si nécessaire
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} DT
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">Available Time Slots:</p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">{item.day}</p>
              <p className="text-[15px] leading-6 text-textColor font-semibold ml-2">{item.startingTime}-{item.endingTime}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* Utilisez Link pour naviguer vers la page "rdv" avec l'ID du docteur */}
      <Link to={`/rdv/${id}`}>
        <button className="btn px-2 w-full rounded-md" onClick={handleBookingClick}>Book Appointment</button>
      </Link>
    </div>
  );
};

export default SidePanel;
