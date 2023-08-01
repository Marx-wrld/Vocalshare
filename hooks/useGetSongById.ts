//We've been fetching songs using server components using hooks
//supabase now allows us to fetch songs from the client components

import { useState } from "react"

const useGetSongById = (id: string) => {
    const [isLoading, setIsLoading] = useState(false);
}