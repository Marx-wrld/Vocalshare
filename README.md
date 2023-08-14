
# Vocalshare
A music service app that gives you access to songs from all over the world.
- Built with Typescript, React(radix ui), supabase(PostgreSQL), stripe(for subscription) and Tailwind CSS


*Stripe (Webhooks-API) config:
- Visit stripe developer-webhooks then click on the `test in a local environment`.
- Type `stripe login` in your terminal after installing the stripe-cli in your local environment.
- Type `stripe listen --forward-to localhost:3000/api/webhooks` in order to get your Stripe Webhook secret then copy the key to your env.local file
