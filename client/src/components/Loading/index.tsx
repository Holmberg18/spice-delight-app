
interface Loading {
    height: string,
    width: string,
}

const Loading = ({ height, width }: Loading) => {

    return (
        <div className={`relative max-w-md rounded overflow-hidden shadow-lg h-[30rem] w-[26rem] m-8 flex flex-col justify-evenly items-center`}>
            <div className={`bg-grey bg-opacity-30 flex justify-center items-center`}>
                <div className={`rounded-full border-8 border-gray border-t-blue animate-spin ${height} ${width}`}></div>
            </div>
        </div>
    );
}

export default Loading;
