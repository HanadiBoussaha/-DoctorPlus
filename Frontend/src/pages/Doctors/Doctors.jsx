import React, { useState } from 'react';
import DoctorCard from './../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data } = useFetchData("http://localhost:5000/api/v1/doctors");
  const doctors = data?.data ?? [];

  const handleSearch = () => {
    console.log('Search button clicked');
    console.log(query.trim());
    setQuery(query.trim());
  };

  const filteredDoctors = query.trim() === '' ? doctors : doctors.filter(doctor =>
    doctor.name.includes(query) 
    
  );

  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className="container text-center">
          <h2 className="heading"> Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder='Search doctor by name or specialization'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className='btn mt-0 rounded-[0px] rounded-r-md'> Search</button>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          {loading && <Loader />}
          {error && <Error />}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers unmatched, expert healthcare.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
