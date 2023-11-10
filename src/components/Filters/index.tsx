import { 
    Formik,
    Form,
    Field,
 } from "formik"
 import { CartState } from '../../context/Context'
 import Rating from "../Rating"
 import Button from "../Button"

 interface MyFormValues {
    sortBy: string
 }

const Filters = () => {

    const { 
        productState: { byStock, byFastDelivery, sort, byRating},
        productDispatch 
    } = CartState()

    const initialValues: MyFormValues = { sortBy: ''}
    const filter_list: {value: string, type: string, order: string, dispatch: string, checked: boolean}[] = [
        { value: "Ascending", type:"radio", order: "lowToHigh", dispatch: "SORT_BY_PRICE", checked: false},
        { value: "Descending", type:"radio", order: "highToLow", dispatch: "SORT_BY_PRICE", checked: false},
        { value: "Include Out of Stock", type:"checkbox", order: "byStock", dispatch: "FILTER_BY_STOCK", checked: byStock},
        { value: "Fast Delivery Only", type:"checkbox", order: "byFastDelivery", dispatch: "FILTER_BY_DELIVERY", checked: byFastDelivery},
    ]
    return (
        <div className="bg-[#343a40] text-white p-6 w-[20%] m-2 h-[86vh]">
            <span className="text-xl">Filter Products</span>
            <Formik
                initialValues={initialValues}
                onSubmit={( values, actions) => {
                    console.log({values, actions})
                    actions.setSubmitting(false)
                }}
            >
                <Form className="flex flex-col wrap m-9">
                    {
                        filter_list.map((filter) => 
                            <span key={filter.value} className="flex space-x-4 pb-4">
                                <Field 
                                    type={filter.type} 
                                    name="filter" 
                                    value={filter.value} 
                                    onChange={() => {
                                        productDispatch({type: filter.dispatch, payload: filter.order})
                                    }}
                                    checked={(filter.dispatch === "SORT_BY_PRICE" && sort === filter.order) || filter.checked}
                                 />
                                <p>{filter.value}</p>
                            </span>
                        )
                    }
                    <div className="flex flex-row mb-3">
                        <label className="pr-3">Rating:</label>
                        <Rating 
                            rating={byRating}
                            onClick={(i: number) => 
                                productDispatch({
                                    type: "FILTER_BY_RATING",
                                    payload: i + 1,
                                })}
                            className="cursor-pointer"
                        />
                    </div>
                    <Button buttonType="button" name="Clear Filters" rounded={true} action={() => productDispatch({type: "CLEAR_FILTERS"})}/>
                </Form>
            </Formik>
        </div>
    )
}

export default Filters