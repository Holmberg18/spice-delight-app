import { useState } from 'react'
import {
    Formik,
    Form,
    Field,
} from "formik"
import { CartState } from '../../context/Context'
import Rating from "../Rating"
import Button from "../Button"
import { ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons"

interface MyFormValues {
    sortBy: string
}

const Filters = () => {

    const {
        mealState: { byStock, byFastDelivery, sort, byRating },
        mealDispatch
    } = CartState()

    const [showFilters, setShowFilters] = useState(false)

    const initialValues: MyFormValues = { sortBy: '' }
    const filter_list: { value: string, type: string, order: string, dispatch: string, checked: boolean }[] = [
        { value: "Ascending", type: "radio", order: "lowToHigh", dispatch: "SORT_BY_PRICE", checked: false },
        { value: "Descending", type: "radio", order: "highToLow", dispatch: "SORT_BY_PRICE", checked: false },
        { value: "Include Out of Stock", type: "checkbox", order: "byStock", dispatch: "FILTER_BY_STOCK", checked: byStock },
        { value: "Fast Delivery Only", type: "checkbox", order: "byFastDelivery", dispatch: "FILTER_BY_DELIVERY", checked: byFastDelivery },
    ]


    const returnForm = (mobile: boolean): ReactNode => (
        <div className={`bg-[#343a40] flex flex-col px-8 text-white py-6 overflow-x-auto justify-center ` + (mobile ? `flex lg:hidden w-full` : "hidden lg:block w-full md:h-[86vh]")}>
            <span className="text-xl">Filter Recipes</span>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    actions.setSubmitting(false);
                }}
            >
                <Form className={`md:flex md:flex-col wrap md:my-8 md:mx-2 p-1`}>
                    {filter_list.map((filter) => (
                        <span key={filter.value} className={mobile ? "flex items-center space-x-4 mr-4 my-2" : "md:flex md:space-x-4 pb-4 flex-row flex-nowrap"}>
                            <Field
                                type={filter.type}
                                name="filter"
                                value={filter.value}
                                onChange={() => {
                                    mealDispatch({ type: filter.dispatch, payload: filter.order });
                                }}
                                checked={(filter.dispatch === "SORT_BY_PRICE" && sort === filter.order) || filter.checked}
                            />
                            {<p>{filter.value}</p>}
                        </span>
                    ))}
                    <div className={mobile ? "flex items-center" : "flex align-middle md:flex md:flex-row mb-3"}>
                        <label className="flex my-auto">Rating:</label>
                        <Rating
                            rating={byRating}
                            onClick={(i: number) =>
                                mealDispatch({
                                    type: "FILTER_BY_RATING",
                                    payload: i + 1,
                                })}
                            className="cursor-pointer mx-2 my-3"
                        />
                    </div>
                    <Button buttonType="button" name="Clear Filters" rounded={true} action={() => mealDispatch({ type: "CLEAR_FILTERS" })} className="max-w-[10rem] mt-6" />
                </Form>
            </Formik>
        </div>
    )

    return (
        <div>
            { /** Mobile View */}
            <div className="bg-[#343a40] w-full h-[max-content] text-white p-4 flex items-center justify-between lg:hidden">
                <span>Filters</span>
                {
                    <FontAwesomeIcon 
                        className="cursor-pointer text-xl mx-4" 
                        onClick={() => setShowFilters(!showFilters ? true : false)} 
                        icon={!showFilters ? faChevronRight : faChevronDown} 
                    />
                }
            </div>
            {showFilters ? returnForm(true) : ""}
            {returnForm(false)}
        </div>
    )
}

export default Filters