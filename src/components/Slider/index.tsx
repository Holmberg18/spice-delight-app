import { useState, useEffect } from 'react' 
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Arrow from './Arrow'

interface Props {
    classes: string,
    getSlideData: Function,
    id: string,
    src: string,
    label: string,
    background: string,
    perView: number,
    thumbSize: string,
    action?: Function,
    imageId: string,
    arrows?: boolean,
    initialSlide?: number,
}

const Slider = ({ classes, getSlideData, id, src, label, background, perView, action, imageId, arrows, initialSlide, thumbSize }: Props) => {

    const [slideData, setSlideData] = useState<Object[]>([])
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)

    const handleImgClick = (imgSrc: string): void => {
        if(typeof action === "function"){
            action(imgSrc)
        }
    }

    const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "min-width: 300px)": {
                slides: { perView: perView - 4, spacing: 5}
            },
            "(min-width: 400px)": {
                slides: { perView: perView - 3, spacing: 10 },
            },
            "(min-width: 800px": {
                slides: { perView: perView, spacing: 15}
            }
        },
        initial: initialSlide || 1,
        loop: true,
        mode: "free-snap",
        created(){
            setLoaded(true)
        },
        slideChanged(slider){
            setCurrentSlide(slider.track.details.rel)
        }
    })

    const getSlides = async(): Promise<void> => {
        const data = await getSlideData()
        setSlideData(data)
        setTimeout(() => instanceRef.current?.update(), 50);       
    }

    useEffect(() => {
        getSlides()
    },[])

    return (
        <>
            <div ref={ref} className={`keen-slider ${classes}`} >
                {
                    Array.isArray(slideData) && slideData.length > 0 ? slideData.map((slide: {[key: string]: any}, index: number) => 
                        <div key={slide[id]} className={`keen-slider__slide number-slide${index} relative w-52 h-36`}>
                            <div className={`z-20 absolute m-auto left-0 right-0 top-0 bottom-0 w-full max-w-[${thumbSize === "sm" ? "6.5rem" : "8.5rem"}]`}>
                                <img src={slide[src]} alt="recipe" className={`rounded-full`} onClick={() => handleImgClick(slide[imageId])} />
                            </div>
                            <p className="absolute z-10 m-auto left-0 right-0 bottom-3 text-white text-sm">{slide[label].split(" ").slice(0, 2).join(" ")}</p>
                            <div className={`absolute z-0 w-48 h-36 m-auto left-0 right-0 bottom-0 rounded-lg ${background}`}/>
                        </div>
                    ) : ''
                }
            </div>
            {
                arrows && loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e:any) => 
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                            fill="#CC3232"
                        />
                        <Arrow 
                            onClick={(e: any) => 
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef?.current?.track?.details?.slides.length - 1
                            }
                            fill="#CC3232"
                        />
                    </>
                )
            }
        </>
        
    )
}

export default Slider