import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import Stripe from "stripe"
import StripeCheckout from "@/components/StripeCheckout"
import { Elements } from "@stripe/react-stripe-js"
import { getStripeKey } from "@/utils/stripe"

interface Props {
    totalAmount: number
}

const Payment = ({ totalAmount }: Props) => {
    const [keys, setKeys] = useState<void | StripeKey>()
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState<any>("")

    const getKeys = async() => {
        const retrieveKeys = await getStripeKey("stripe_key")
        setKeys(retrieveKeys)
    }

    const buildStripePromise = async() => {
        getKeys()
        const loadedStripe = keys ? await loadStripe(keys?.publishableKey) : null
        setStripePromise(loadedStripe)
    }

    const buildPaymentIntent = async() => {
        try{
            const stripe = keys ? await new Stripe(keys.secretKey) : null
            const paymentIntent = await stripe?.paymentIntents.create({
                currency: "usd",
                amount: totalAmount * 100,
                automatic_payment_methods: {
                    enabled: true
                }
            })
            setClientSecret(paymentIntent?.client_secret)
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
                        <StripeCheckout totalAmount={totalAmount}/>
                    </Elements>
                )
            }
        </>
    )
}

export default Payment



