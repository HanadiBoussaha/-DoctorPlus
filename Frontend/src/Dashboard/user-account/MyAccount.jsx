import { useContext, useState } from 'react';

import { authContext } from '../../context/AuthContext';
import MyBookings from './MyBookings';
import { Link, useNavigate } from "react-router-dom";
import Profile from './Profile';
import { toast } from "react-toastify";

const MyAccount = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState('bookings');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));


  const user = localStorage.getItem("user");
  const itemsArray = JSON.parse(user);
  console.log(itemsArray);
  const id = itemsArray._id;
  console.log("id",id);
  


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home")
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Récupérer le token d'authentification depuis le localStorage ou autre
      const user = localStorage.getItem("user");
      const itemsArray = JSON.parse(user);
      console.log(itemsArray);
      const id = itemsArray._id;
      console.log("id",id);
      
      const res = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Inclure le token d'authentification dans les en-têtes de la requête
        },
      });

      const { message } = await res.json();
     
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login")

      // Recharger la liste des utilisateurs après la suppression
      
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className='grid md:grid-cols-3 gap-10'>
          <div className='pb-[5px] px-[30px] rounded-md'>
            <div className='flex items-center justify-center'>
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img src={itemsArray.photo} alt="" className='w-full h-full rounded-full' />
              </figure>
            </div>

            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{itemsArray.name}</h3>
              <p className='text-textColor text-[15px] leading-6 font-medium'>{itemsArray.email}</p>
              <p className='text-textColor text-[15px] leading-6 font-medium'>Blood Type :
               <span className='ml-2 text-headingColor text-[22px] leading-8'></span>
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
              <button onClick={() => handleDelete(user._id)} className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete My Account</button>
            </div>
          </div>

          <div className='md:col-span-2 md:px-[30px]'>
            <div>
              <button onClick={() => setTab('bookings')} className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>My Booking</button>
              <button onClick={() => setTab('settings')} className={` ${tab === 'settings' && 'bg-primaryColor text-white font-normal'} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Settings</button>
            </div>

            {tab === 'bookings' && <MyBookings />}
            {tab === 'settings' && <Profile user={userData}/>}
           
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
