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
    const [stripePromise, setStripePromise] = useState<any>()
    const [clientSecret, setClientSecret] = useState<any>()

    const buildPaymentPromiseIntent = async() => {
        try{
            const stripeKeys: StripeKey | void = await getStripeKey("stripe_key")
            const loadedStripe = stripeKeys ? await loadStripe(stripeKeys?.publishableKey) : null
            setStripePromise(loadedStripe)
            const stripe: Stripe | null = stripeKeys ? await new Stripe(stripeKeys.secretKey) : null
            const paymentIntent = await stripe?.paymentIntents.create({
                currency: "usd",
                amount: totalAmount * 100,
                automatic_payment_methods: {
                    enabled: true
                }
            })
            if(paymentIntent?.client_secret){
                setClientSecret(paymentIntent.client_secret)
            }
        } catch (e: any){
            console.log(e.message)
        }
    }

    useEffect(() => {
        buildPaymentPromiseIntent()
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



