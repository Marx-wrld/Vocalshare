
# Vocalshare
A music service app that gives you access to songs from all over the world.
- Built with Typescript, React(radix ui), supabase(PostgreSQL), stripe(for subscription) and Tailwind CSS

**Stripe (Webhooks-API) config: Open two separate terminals(You can use your editors terminal)
- Visit stripe developer-webhooks then click on the `test in a local environment`.
- Type `stripe login` in your terminal after installing the stripe-cli in your local environment. (1st terminal)
- Type `stripe listen --forward-to localhost:3000/api/webhooks` in order to get your Stripe Webhook secret then copy the key to your env.local file (same 1st terminal)

- Type `stripe trigger payment_intent.succeeded` (2nd terminal) to test the `stripe listen --forward-to localhost:3000/api/webhooks` and check whether it returns a 200 POST response on the 1st terminal.

- <b> Webhook terminal needs to remain active while in developer mode </b>


![Screenshot (58)](https://github.com/Marx-wrld/Vocalshare/assets/105711066/a0795e1f-f6c7-4623-9f52-0884f7e182a2)

![Screenshot (59)](https://github.com/Marx-wrld/Vocalshare/assets/105711066/c7f6e154-7a5a-4260-8ab4-87e2386dfb53)

![Screenshot (60)](https://github.com/Marx-wrld/Vocalshare/assets/105711066/66c66771-430d-4239-b046-6836da7527ac)
