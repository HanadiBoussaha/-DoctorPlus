import { useState, useEffect } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUserDataForReviews = async () => {
      try {
        const usersIds = reviews.map(review => review.id);
        console.log(usersIds);
         // Obtenez les IDs des utilisateurs à partir des avis
        const usersData = await Promise.all(usersIds.map(userId => fetchUserData(userId))); // Fetch les données des utilisateurs
        setUsersData(usersData);
      } catch (err) {
        console.error("Erreur lors de la récupération des données utilisateur :", err);
      }
    };

    fetchUserDataForReviews(); // Appel de la fonction pour récupérer les données des utilisateurs
  }, [reviews]); // Utilisez `reviews` comme dépendance pour mettre à jour les données des utilisateurs lorsque les avis changent

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Fonction pour trouver un utilisateur par ID
  const findUserById = (id) => {
    return usersData.find(user => user._id === id) || {};
  };

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>
        {reviews.map((review, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img className="w-full" src={findUserById(review?.user?._id)?.photo || avatar} alt="" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {findUserById(review?.user?._id)?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formateDate(review?.createdAt)}
                </p>
                <p className="text__para mt-3 font-medium text-[15px]">
                  {review.reviewText}
                </p>
              </div>
            </div>

            <div className=" flex gap-1">
              {[...Array(review?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
