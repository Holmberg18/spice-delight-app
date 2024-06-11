import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { fetchRecipesAsync } from "@/features/recipeSlice"
import Filters from "@/components/Filters"
import SingleMeal from "@/components/SingleMeal"
import { Meal } from "@/models/Meal"

const Meals = () => {

   const dispatch = useAppDispatch()
   const recipeList = useAppSelector((state) => state.recipes.items)
   const filterList = useAppSelector((state) => state.recipes.filters)
   const { 
        sortByPrice,
        includeOutOfStock,
        fastDeliveryOnly,
        minRating,
        searchQuery,
    } = filterList

    useEffect(() => {
        if(recipeList?.length == 0){
            dispatch(fetchRecipesAsync(["Mexican", "Spanish"]))
        }
    }, [recipeList?.length, dispatch]);


    const filteredMeals = useMemo(() => {
        return recipeList?.filter(meal => includeOutOfStock ? true : meal.inStock)
            .filter(meal => fastDeliveryOnly ? meal.fastDelivery: true)
            .filter(meal => minRating ? meal.ratings >= minRating : true)
            .filter(meal => searchQuery ? meal.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()): true)
            .sort((a,b) => sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price)
    },[recipeList, sortByPrice, includeOutOfStock, fastDeliveryOnly, minRating, searchQuery])

    return(
        <div className="flex flex-col lg:flex-row wrap">
            <Filters />
            <div className="grid grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-3 lg:w-[75%] justify-center">
                {filteredMeals?.length ? filteredMeals.map((prod: Meal) => {
                    return <SingleMeal meal={prod} key={prod.idMeal} />
                }): ""}
            </div>
        </div>
    )
}

export default Meals





// import { useState, useEffect, useMemo } from 'react'
// import { useAppDispatch, useAppSelector } from '../../hooks'
// import { fetchRecipesAsync } from '../../features/recipeSlice'
// import Filters from '../../components/Filters'
// import SingleMeal from '../../components/SingleMeal'
// import { Meal } from '../../models/Meal'

// const Meals = () => {

//    const dispatch = useAppDispatch()
//    const recipeList = useAppSelector((state) => state.recipes.items)
//    const filterList = useAppSelector((state) => state.recipes.filters)
//    const [meals, setMeals] = useState<Meal[]>([])
//    const { 
//     sortByPrice,
//     includeOutOfStock,
//     fastDeliveryOnly,
//     minRating,
//     searchQuery,
//     } = filterList

//    const applyFilters = (): void => {
        
//         if(recipeList?.length == 0){
//             dispatch(fetchRecipesAsync(["Mexican", "Spanish"]))
//         }

//         let sortedMeals: Meal[] = Array.isArray(recipeList) ? [...recipeList] : []

//         if(Array.isArray(sortedMeals) && sortedMeals.length){

//             if(sortByPrice){
//                 sortedMeals?.sort((a: Meal, b: Meal) =>
//                     sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price
//                 )
//             }
    
//             if(!includeOutOfStock){
//                 sortedMeals = sortedMeals?.filter((prod: Meal) => prod.inStock)
//             }
    
//             if(fastDeliveryOnly){
//                 sortedMeals = sortedMeals?.filter((prod: Meal) => prod.fastDelivery)
//             }
    
//             if(minRating){
//                 sortedMeals = sortedMeals?.filter(
//                     (prod: Meal) => prod.ratings >= minRating
//                 )
//             }
    
//             if(searchQuery){
//                 sortedMeals = sortedMeals?.filter((prod: Meal) => 
//                     prod.name.toLowerCase().includes(searchQuery)
//                 )
//             }
//         }
//         setMeals(sortedMeals ? sortedMeals : [])
//    }

//     useEffect(() => {
//         applyFilters()
//     }, [recipeList, filterList]);


//     const mealList = useMemo(() => (
//         Array.isArray(meals) ? meals : []
//     ),[meals])

//     return(
//         <div className="flex flex-col lg:flex-row wrap">
//             <Filters />
//             <div className="grid grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-3 lg:w-[75%] justify-center">
//                 {mealList.length ? mealList.map((prod: Meal) => {
//                     return <SingleMeal meal={prod} key={prod.idMeal} />
//                 }): ""}
//             </div>
//         </div>
//     )
// }

// export default Meals