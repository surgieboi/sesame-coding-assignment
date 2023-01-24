import { supabase } from "../utils/supabaseClient"

export async function verifyUser(address) {
    try {
        const { data, error } = await supabase
            .from('wallets')
            .update({
                is_verified: true
            })
            .eq('wallet', address)
        if (error) throw error;
        // console.log("The connected MetaMask wallet address is now verified in Supabase.");
    } catch (error) {
        // console.log("The connected MetaMask wallet address has not been verified in Supabase.");
    };
}