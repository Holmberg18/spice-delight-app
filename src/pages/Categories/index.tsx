import { useState, useEffect, ChangeEvent } from 'react'
import Slider from "../../components/Slider"
import Banner from "../../components/Banner"
import { getCategories, getBannerPhotos } from "../../utils/recipes"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import categories from '../../data/categories.json'

const Categories = () => {

    const [bannerId, setBannerId] = useState<string>("")
    const [banners, setBanners] = useState<{[key:string]: any}>({})
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handleBannerImgClick = (id: string): void => {
        setBannerId(id)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: string = e.currentTarget.value.toLowerCase()
        const categoryList: {[key: string]: any} = categories
        if(input in categories){
            setBannerId(categoryList[input])
        }
    }

    const getBanners = async(): Promise<void> => {
        const data: Object[] = await getBannerPhotos()
        let bannerData: {[key:string]:any} = {}
        data.forEach((banner: {[key:string]:any}) => {
            bannerData[banner.id] = banner.urls.full
        })
        setBanners(bannerData)
    }

    useEffect(()=> {
        getBanners()
    },[])

    return (
        <div className="grid grid-cols-1 place-items-center mt-[10rem] mb-[30rem]">
            <div className="flex items-center justify-center gap-24 my-2 h-[30vh] md:w-full">
                <h1 className="font-medium text-xxl">Search by <span className="text-[#CC3232]">Category</span></h1>
                <div className="relative cursor-pointer">
                    <input
                        type="text"
                        placeholder="Search for categories..."
                        className="p-2 border border-gray-300 focus:border-[#CC3232] focus:border-2 focus:outline-none rounded w-[25rem]"
                        autoFocus
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={(e) => handleInputChange(e)}
                    />
                    { isFocused && <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute text-[#CC3232] top-[1rem] right-[1rem]" /> }
                </div>
            </div>
            <div className="relative w-full max-w-[90%] h-max">
                <Banner src={bannerId?.length > 0 ? banners[bannerId]: "/category_banner.jpg"} classes="absolute z-1 h-[50vh] rounded-xl" />
                <Slider 
                    classes="absolute z-2 top-[5rem] cursor-pointer"
                    getSlideData={getCategories}
                    id="idCategory"
                    src="strCategoryThumb"
                    label="strCategory"
                    background="bg-black"
                    perView={5}
                    thumbSize={"200px"}
                    action={handleBannerImgClick}
                    imageId="banner"
                    arrows={true}
                />
            </div>
        </div>
    )
}

export default Categories