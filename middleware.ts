import  { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) { //Creates a middleware function
    const res = NextResponse.next(); // Creates a NextResponse object
    const supabase = createMiddlewareClient({ // Creates a Supabase client
        req, 
        res
    });

    await supabase.auth.getSession(); // Gets the session from the client
    return res; // Returns the response
}