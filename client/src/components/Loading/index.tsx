
interface Placeholder {
    height: string,
    width: string,
}

const Placeholder = ({ height, width}: Placeholder) => (
    <div className={`bg-grey bg-opacity-30 flex justify-center items-center`}>
        <div className={`${height} ${width} rounded-full border-8 border-gray border-t-blue animate-spin`}></div>
    </div>
);

const Loading = () => {
    return (
        <div className="relative max-w-md rounded overflow-hidden shadow-lg h-[30rem] w-[26rem] m-8 flex flex-col justify-evenly items-center">
            <Placeholder height="h-[18rem]" width="w-[18rem]" />
        </div>
    );
}

export default Loading;
