import AboutBackground from "/about-background.png";
import AboutBackgroundImage from "/about-background-image.png";

const About = () => {
    return (
        <div className="mt-80 relative flex items-center justify-between">
            <div className="absolute -left-[150px] -z-10">
                <img src={AboutBackground} alt="" />
            </div>
            <div className="flex-[0.9] mr-4">
                <img src={AboutBackgroundImage} alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <p className="font-bold text-[#fe9e0d] text-[1.15rem]">About</p>
                <h1 className="text-3xl font-extrabold leading-snug">
                    Food Is An Important Part Of A Balanced Diet
                </h1>
                <p className="text-gray-700 my-4">
                    A nutritious and balanced diet plays a vital role in maintaining our well-being and energy. The food we eat not only fuels our bodies but also nurtures our minds, helping us stay focused and active throughout the day.
                    At its core, food is about connection—bringing people together to share flavors, stories, and moments. It’s the heart of celebrations, the comfort in quiet evenings, and the foundation for a healthier tomorrow.
                </p>
                <p className="text-gray-700 mb-4">
                    Discover the joy of wholesome, flavorful meals with Spice Delight—where every bite is a celebration of taste and quality.
                </p>
            </div>
        </div>
    )
}

export default About;