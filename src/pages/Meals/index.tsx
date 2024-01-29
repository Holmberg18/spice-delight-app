import { useState, useEffect, useMemo } from 'react'
import { CartState } from '../../context/Context'
import Filters from '../../components/Filters'
import SingleMeal from '../../components/SingleMeal'

const Meals = () => {

    const [transformMeals, updateTransformMeals] = useState<Meal[]>([])
    const [recipeList, setRecipeList] = useState<Meal[]>([])
    const {
        state: { recipes },
        mealState: { sort, byStock, byFastDelivery, byRating, searchQuery }
    }: {
        state: { recipes: Meal[] },
        mealState: {
            sort: string,
            byStock: boolean,
            byFastDelivery: boolean,
            byRating: number,
            searchQuery: string
        }
    } = CartState()


    const sortMeals = async() => {

        if(recipeList.length === 0){
            const recipeLibrary = await recipes
            setRecipeList(recipeLibrary)
            updateTransformMeals(recipeList)
        }
        let sortedMeals: Meal[] = recipeList

        if(sort){
            sortedMeals.sort((a: Meal, b: Meal) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            )
        }

        if(!byStock){
            sortedMeals = sortedMeals.filter((prod: Meal) => prod.inStock)
        }

        if(byFastDelivery){
            sortedMeals = sortedMeals.filter((prod: Meal) => prod.fastDelivery)
        }

        if(byRating){
            sortedMeals = sortedMeals.filter(
                (prod: Meal) => prod.ratings >= byRating
            )
        }

        if(searchQuery){
            sortedMeals = sortedMeals.filter((prod: Meal) => 
                prod.name.toLowerCase().includes(searchQuery)
            )
        }

       updateTransformMeals(sortedMeals)
    }

    useEffect(()=> {
        sortMeals()
    },[recipeList, sort, byStock, byFastDelivery, byRating, searchQuery])

    const mealList = useMemo(() => (
        transformMeals.length ? transformMeals : []
    ),[transformMeals])

    return(
        <div className="flex flex-col lg:flex-row wrap">
            <Filters />
            <div className="grid grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-3 lg:w-[75%] justify-center">
                {mealList.length ? mealList.map((prod: Meal) => {
                    return <SingleMeal meal={prod} key={prod.idMeal} />
                }): ""}
            </div>
        </div>
    )
}

export default Meals