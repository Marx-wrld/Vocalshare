useEffect(() => {
    const unsubscribe = client.subscribe(
        `database.${process.env.NEXT_PUBLIC_DB_ID}.collections.${process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID}.documents`,
        (data) => {
            const messages = data.payload.messages;
            setMessages(messages.map(parseJSON));
        }
    );
    return () => {
        unsubscribe();
    };
},
[]);

<div className='chat_container'>
    {/* chat messages element */}

    <div ref={lastMessageRef}/>

</div>

const lastMessageRef = useRef(null);

useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
        behavior: 'smooth'
    });
}, [messages]);