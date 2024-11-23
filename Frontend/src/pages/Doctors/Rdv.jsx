import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { token } from "../../config";

const Rdv = () => {
    const [sujet, setSujet] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    console.log("idd:",id);

    const handleSubmitRdv = async () => {
        setLoading(true);

        try {
            if (!sujet || !message || !date) {
                setLoading(false);
                return toast.error("All fields are required");
            }

            const res = await fetch(
                `http://localhost:5000/api/v1/doctors/${id}/rdv`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ sujet, message, date }),
                }
            );
            
            const result = await res.json();
console.log("test:",result);
            if (!res.ok) {
                throw new Error(result.message);
            }

            setLoading(false);
            toast.success(result.message);

            // Réinitialiser les champs après la soumission réussie
            setSujet("");
            setMessage("");
            setDate("");
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    return ( 
        <section>
            <div className="px-4 mx-auto max-w-screen-md"> 
                <h2 className="heading text-center">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text__para">
                    Got a technical issue? Want to send feedback about a beta feature? 
                    Let us know.
                </p>
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="subject" className="form__label">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Subject"
                            className="form__input mt-1"
                            value={sujet}
                            onChange={(e) => setSujet(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="form__label">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            placeholder="Date"
                            className="form__input mt-1"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="form__label">
                            Your Message
                        </label>
                        <textarea
                            rows="6"
                            id="message"
                            placeholder="Leave a comment...."
                            className="form__input mt-1"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" onClick={handleSubmitRdv} className="btn rounded sm:w-fit">
                        {loading ? <HashLoader size={25} color="#fff" /> : 'Submit'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Rdv;
