import { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import axios from 'axios'

interface Props {
    classes: string
}
const Recipes = ({classes}: Props) => {

    const [recipes, setRecipes] = useState([])
    const [ref, slider] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "min-width: 200px)": {
                slides: { perView: 1, spacing: 5}
            },
            "(min-width: 400px)": {
                slides: { perView: 2, spacing: 10 },
            },
            "(min-width: 1000px": {
                slides: { perView: 2, spacing: 15}
            }
        },
        loop: true,
        mode: "free-snap"
    })

    const getRecipes = async() => {

        const meals: any = await axios({
            url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response: any) => response.data)
        .then((data: any) => data.meals)
        .catch((error) => {
            console.log(error)
        })
        setRecipes(meals)
        setTimeout(() => slider.current?.update(), 50);       
    }

    useEffect(() => {
        getRecipes()
    },[])

    return(
        <div ref={ref} className={"keen-slider" + " "+classes} >
            {
                Array.isArray(recipes) && recipes.length > 0 ? recipes.map((recipe: {[key: string]: any}, index: number) => 
                    <div key={recipe.idMeal} className={`keen-slider__slide number-slide${index} relative w-52 h-52`}>
                        <div className="z-20 absolute m-auto left-0 right-0 top-0 bottom-0 w-36 h-36">
                            <img src={recipe.strMealThumb} alt="recipe" className="w-36 h-36 rounded-full" />
                        </div>
                        <p className="absolute z-10 m-auto left-0 right-0 bottom-1 text-white">{recipe.strMeal}</p>
                        <div className="absolute z-0 w-48 h-36 m-auto left-0 right-0 bottom-0 bg-purple-400"/>
                    </div>
                ) : ''
            }
        </div>
    )
}

export default Recipes