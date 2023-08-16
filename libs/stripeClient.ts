import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => { //creating a function that will return a promise of stripe or null
    if (!stripePromise) { //if there's no stripe promise then just return null
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');
    }
    return stripePromise;
}

//creating helpers to help in creating web hooks