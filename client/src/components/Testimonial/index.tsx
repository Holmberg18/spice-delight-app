import ProfilePic from "/testimonial_4_round.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
    return (
        <div className="mt-60 work-section-wrapper">
            <div className="text-center mb-8">
                <p className="text-lg font-bold text-orange-500">Testimonial</p>
                <h1 className="text-3xl font-extrabold mb-4">What They Are Saying</h1>
                <p className="text-gray-700">
                    Hear from our happy customers about their experiences. Discover why so many trust us to deliver excellence every day.
                </p>
            </div>

            <div className="mt-8 mx-auto bg-white p-6 max-w-xl rounded-2xl flex flex-col items-center text-center">
                <img src={ProfilePic} alt="Profile picture" className="w-20 h-20 rounded-full mb-4" />
                <p className="text-lg font-bold text-gray-600 max-w-lg mb-6">
                "Spice Delight has completely transformed our mealtime routine! The dishes are bursting with authentic flavors, always fresh, and delivered with impeccable service—truly a treat we look forward to every week."
                </p>
                <div className="flex justify-center gap-1 text-orange-500 text-xl mb-4">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
                <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
            </div>
        </div>

    );
}

export default Testimonial