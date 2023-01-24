import { supabase } from "../utils/supabaseClient"

export async function addWallet(address) {
    try {
        const { data, error } = await supabase
            .from('wallets')
            .insert({
                wallet: address,
                is_connected: true
            })
            .select()
        if (error) throw error;
        // console.log("The connected MetaMask wallet is now saved in Supabase.");
    } catch (error) {
        // console.log("The connected MetaMask wallet was not saved in Supabase.");
    };
}