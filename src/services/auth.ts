import { supabase } from "../../src/supabaseClient";

export async function loginUser(email:string, password:string) {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    })
    
}

export async function signUpUser(email:string, password:string){
    return await supabase.auth.signUp({email, password});
}

export async function saveUserProfile(userId:string,profileData:{
    tfusername:string;
    tfphone:string;
    tfrole:string;
    tffull_name:string;
    tfbusiness_name:string;
}){
    return await supabase.from("tblprofile").insert([
        {tfuserid:userId, ...profileData}
    ])
}

