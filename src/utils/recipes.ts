import axios from 'axios'
import categoryMap from '../data/categories.json'

const fetchRecipes = () => {

    const recipes = axios({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response: any) => response.data)
    .then((data: any) => {
        let meals: Meal[] = data.meals
        meals = meals.map((meal : {[key: string]: any}) => ({
                ...meal, 
                price: (Math.random() * (50 - 10) + 10).toFixed(2),
                ratings: (Math.random() * (5 - 1) + 1).toFixed(),
                inStock: Math.random() >= 0.5,
                fastDelivery: Math.random() >= 0.5
        }))
        return meals
    })
    .catch((error) => {
        console.log(error)
    })

    return recipes
}

const getCategories = (): any => {

    const categories = axios({
        url: "https://www.themealdb.com/api/json/v1/1/categories.php",
        method: "GET",

        headers: {
            "Content-type": "application/json",
        }
    })
    .then((response) => response.data)
    .then((data: any) => {
        let categoryData = data.categories
        const categoryBanners: {[key: string]: any} = categoryMap
        categoryData.map((category: {[key: string]: any}) => {
            let newCategory = category
            newCategory["banner"] = categoryBanners[category["strCategory"].toLowerCase()]
            return newCategory
        })
        return categoryData
    })
    .catch((error) => {
        console.log(error)
    })

    return categories

}

const getBannerPhotos = ():any => {

    const bannerPhotos = axios({
        url: "https://api.unsplash.com/collections/dVF4uttpg3Y/photos?client_id=Svufk8F8y9unuqsZ6nrws9CSLsc_RvHXjQlo79XAEQ0&per_page=16",
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    })
    .then((response) => response.data)
    .then((data:any) => data)
    .catch((error) => {
        console.log(error)
    })

        return bannerPhotos
}

export { fetchRecipes, getCategories, getBannerPhotos }