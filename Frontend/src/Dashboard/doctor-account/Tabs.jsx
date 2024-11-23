import { useContext, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const Tabs = ({ tab, setTab }) => {
  const [loading, setLoading] = useState(false);
    const {dispatch} = useContext(authContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/home")
      };
      const user = localStorage.getItem("user");
      const itemsArray = JSON.parse(user);
      console.log(itemsArray);
      const id = itemsArray._id;
      console.log("id",id);
      const handleDelete = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token'); // Récupérer le token d'authentification depuis le localStorage ou autre
          const user = localStorage.getItem("user");
          const itemsArray = JSON.parse(user);
          console.log(itemsArray);
          const id = itemsArray._id;
          console.log("id",id);
          
          const res = await fetch(`http://localhost:5000/api/v1/doctors/${id}`, {
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
  return <div>

    <span className='lg:hidden'>
        <BiMenu className="w-6 h-6 cursor-pointer"/>
    </span>
    <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
       <button 
       onClick={()=>setTab('overview')}
       className={`${tab==='overview' ? 
       'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor'} 
       w-full btn mt-0 rounded-md`}>
        Overview</button>

       <button 
       onClick={()=>setTab('appointments')}
       className={`${tab==='appointments' ? 
       'bg-indigo-100 text-primaryColor'
       :'bg-transparent text-headingColor'} 
       w-full btn mt-0 rounded-md`}>Appointments</button>

       <button 
         onClick={()=>setTab('settings')}
        className={`${tab==='settings' ? 
       'bg-indigo-100 text-primaryColor'
       :'bg-transparent text-headingColor'} 
       w-full btn mt-0 rounded-md`}>
        Profile
        </button>

        <div className="mt-[100px] w-full">
              <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
              <button onClick={() => handleDelete(user._id)} className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete My Account</button>
        </div>
    </div>
      <div>

      </div>
    </div>
  
}

export default Tabs
