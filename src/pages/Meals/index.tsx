import { useEffect, useState, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { fetchProductsAsync } from "@/features/recipeSlice"
import { Filters, SingleMeal, Loading } from "@/components"
import ReactPaginate from "react-paginate"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { IconContext } from "react-icons"

const Meals = () => {

   const dispatch = useAppDispatch()
   const [page, setPage] = useState<number>(0)
   const n = 6
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
            dispatch(fetchProductsAsync())
        }
    }, [recipeList?.length, dispatch]);


    const filteredMeals: Product[] | undefined = useMemo(() => {
        return recipeList?.filter(meal => includeOutOfStock ? true : meal.inStock)
            .filter(meal => fastDeliveryOnly ? meal.fastDelivery: true)
            .filter(meal => minRating ? meal.ratings >= minRating : true)
            .filter(meal => searchQuery ? meal.strMeal.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()): true)
            .sort((a,b) => sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price)
    },[recipeList, sortByPrice, includeOutOfStock, fastDeliveryOnly, minRating, searchQuery])

    const filterData: Product[] | undefined = useMemo(() => {
        return filteredMeals?.filter((_item, index) => {
            return (index >= page * n) && (index < (page + 1) * n)
        })
    }, [filteredMeals, page])

    return(
        <>
            <div className="flex flex-col lg:flex-row wrap">
                <Filters resetPage={setPage} />
                <div className="grid grid-cols-1 m-auto md:grid-cols-2 xl:grid-cols-3 lg:w-[75%] justify-center">
                    {filterData?.length ? filterData.map((prod: Product) => {
                        return <SingleMeal meal={prod} key={prod.idMeal} />
                    }): 
                    [1, 2, 3, 4, 5, 6].map((_, index) => <Loading key={index} />)
                    }
                </div>
            </div>
            <ReactPaginate
                containerClassName={"inline-flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"}
                pageClassName={"px-4 py-2 h-12 w-12 items-center justify-center rounded-lg hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#343a40]"}
                activeClassName={"bg-[#343a40] rounded-full text-white"}
                onPageChange={(event) => setPage(event.selected)}
                pageCount={Math.ceil((filteredMeals ? filteredMeals.length : 1) / n)}
                breakLabel="..."
                previousLabel={
                    <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillLeftCircle />
                    </IconContext.Provider>
                }
                nextLabel={
                    <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillRightCircle />
                    </IconContext.Provider>
                }
            />
        </>
    )
}

export default Meals