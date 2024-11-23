
import React from "react";
import DoctorCard from "./DoctorCard";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const DoctorList = () => {
    const { data, loading, error } = useFetchData("http://localhost:5000/api/v1/doctors");
    
    // Vérifiez que data est défini et contient la propriété 'data' qui contient les données des médecins
    const doctors = data?.data ?? [];

    return (
        <>
            {loading && <Loader />}
            {error && <Error />}
            
            {!loading && Array.isArray(doctors) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
                    {doctors.map((doctor) => (
                        // Passez directement 'doctor' au composant DoctorCard
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>
            )}
        </>
    );
};

export default DoctorList;