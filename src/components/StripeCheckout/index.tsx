import { useState} from "react"
import Button from '@/components/Button';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"

const StripeCheckout = () => {

    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<string>("")
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(!stripe || !elements){
            return
        }

        setIsProcessing(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/products`
            }
        })

        if(error?.message){
            setMessage(message)
        }

        setIsProcessing(false)
        alert("THANK YOU!")
    }
      
    return (
        <div id="payment-form">
            <PaymentElement />
            <Button action={handleSubmit} buttonType="button" name={isProcessing? "Processing" : "Pay Now"} rounded={true} disabled={isProcessing} />
        </div>
    )

}



export default StripeCheckout