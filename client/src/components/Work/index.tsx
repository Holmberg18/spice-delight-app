import PickMeals from "/pick-meals-image.png";
import ChooseMeals from "/choose-image.png";
import DeliveryMeals from "/delivery-image.png";

const Work = () => {
    const workInfoData = [
        {
            image: PickMeals,
            title: "Pick Meals",
            text: "Choose from a wide variety of chef-crafted meals that cater to your tastes and dietary needs.",
        },
        {
            image: ChooseMeals,
            title: "Choose How Often",
            text: "Set your delivery schedule to fit your lifestyle (Immediate Delivery or Later!).",
        },
        {
            image: DeliveryMeals,
            title: "Fast Deliveries",
            text: "Enjoy quick and reliable deliveries, ensuring your meals are fresh and ready when you need them.",
        },
    ];
    return (
        <div className="mt-60 work-section-wrapper">
            <div className="flex flex-col items-center justify-center text-center work-section-top">
                <h1 className="text-3xl font-extrabold leading-snug">How It Works</h1>
                <p className="mt-4 text-gray-600 max-w-[600px] primary-text">
                    
Spice Delight makes enjoying delicious, chef-crafted meals simple and hassle-free. Browse our menu to select from a variety of flavorful options tailored to your preferences.
                </p>
            </div>
            <div className="mt-20 flex flex-wrap items-center justify-center work-section-bottom">
                {workInfoData.map((data) => (
                    <div
                        className="flex flex-col items-center justify-center text-center w-[290px] min-h-[350px] bg-white p-4 rounded-lg shadow-md text-gray-700 m-4 work-section-info"
                        key={data.title}
                    >
                        <div className="info-boxes-img-container mb-4">
                            <img src={data.image} alt={data.title} />
                        </div>
                        <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
                        <p className="font-semibold">{data.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Work