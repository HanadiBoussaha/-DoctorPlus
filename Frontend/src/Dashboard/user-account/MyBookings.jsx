import { useEffect, useState, useContext } from 'react';
import useFetchData from "../../hooks/useFetchData";
import DoctorCard from "../../components/Doctors/DoctorCard.jsx";
import Loading from "../../Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import { authContext } from '../../context/AuthContext';

const MyBookings = () => {
    const { dispatch } = useContext(authContext);
    const [tab, setTab] = useState('bookings');
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement des données
    const user = localStorage.getItem("user");
    const us = JSON.parse(user);
    const id = us._id;
    console.log(id)

    // Effectuer le chargement des données
    const { data, loading, error } = useFetchData(`http://localhost:5000/api/v1/users/appointments/my-appointments/${id}`);
console.log(data)


    // Mettre à jour l'état de chargement lorsque les données sont chargées ou qu'une erreur se produit
 

    // Vérifier si l'ID est valide
    if (!id) {
        return <div>Invalid ID</div>;
    }

    // Afficher le contenu du composant une fois que les données sont chargées et qu'il n'y a pas d'erreur
    return (
        <div>
            {/* Afficher le chargement */}
            
            {/* Afficher l'erreur */}
            {error && <Error errMessage={error} />}
            {/* Afficher les rendez-vous */}
            {loading && !error && data && data.length > 0 && (
                <div>
                    <h2>Your Appointments:</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {data.map(doctor => (
                            <DoctorCard doctor={doctor} key={doctor._id} />
                        ))}
                    </div>
                </div>
            )}
            {/* Afficher un message si aucune donnée n'est disponible */}
            {(!loading &&  data) && (
                <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold
                text-primaryColor'
                >No appointments booked yet</h2>
                
            )}
        </div>
    );
};

export default MyBookings;
