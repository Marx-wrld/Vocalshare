//Creating an [id].js file that retrieves the ticket details via server-side rendering using the id from the page route

//Getting the ticket details
//When you click on each support ticket it needs to redirect you to another page containing all info related to the support ticket


export async function getServerSideProps(context) {
        let ticketObject = {};
        try {
                const response = await db.getDocument(
                        process.env.NEXT_PUBLIC_DB_ID,
                        process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID,
                        context.query.id
                );
                ticketObject = response;
        }
        catch (err) {
                ticketObject = {};
        }
        return {
                props: { ticketObject }
        };
}