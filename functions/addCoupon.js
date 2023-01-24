import { supabase } from "../utils/supabaseClient"

export async function addCoupon(address, couponCode) {

    try {
        const { data, error } = await supabase
            .from('wallets')
            .update({
                coupon_code: couponCode
            })
            .eq('wallet', address)
        if (error) throw error;
        // console.log("The coupon code has been linked to the MetaMask wallet address and saved in Supabase.");
    } catch (error) {
        // console.log("The coupon code has not been linked to the MetaMask wallet address or saved in Supabase.");
    };
}