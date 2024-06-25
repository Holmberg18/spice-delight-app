import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import Stripe from "stripe"
import StripeCheckout from "@/components/StripeCheckout"
import { Elements } from "@stripe/react-stripe-js"

const stripe = new Stripe(import.meta.env.VITE_TEST_STRIPE_SECRET_KEY)

const Payment = () => {
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState<any>("")

    const buildStripePromise = async() => {
        const loadedStripe = await loadStripe(import.meta.env.VITE_TEST_STRIPE_PUB_KEY)
        setStripePromise(loadedStripe)
    }

    const buildPaymentIntent = async() => {
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount: 1999,
                automatic_payment_methods: {
                    enabled: true
                }
            })
            setClientSecret(paymentIntent.client_secret)
        } catch (e: any){
            console.log(e.message)
        }
    }

    useEffect(() => {
        buildStripePromise()
    }, [])

    useEffect(() => {
        buildPaymentIntent()
    }, [])

    return (
        <> 
            {
                stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <StripeCheckout />
                    </Elements>
                )
            }
        </>
    )
}

export default Payment



