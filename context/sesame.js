import { createContext, useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { supabase } from '../utils/supabaseClient';
import { addWallet } from '../functions/addWallet';

const SesameContext = createContext();

export function SesameWrapper({ children }) {
    const [sesame, isSesame] = useState()
    const value = {
        sesame,
        isSesame
    }

    const sesameState = useAccount({
        async onConnect({ address, connector, isReconnected }) {

            // console.log('A MetaMask wallet is now connected to Sesame.', { address, connector, isReconnected })

            try {
                const { data, error } = await supabase
                    .from('wallets')
                    .select(`*`)
                    .eq('wallet', address)
                    .single();
                if (error) throw error;
                // console.log("The connected MetaMask wallet is saved in Supabase.");
                isSesame(data)
            } catch (error) {
                // console.log("The connected MetaMask wallet has not been saved in Supabase.");
                addWallet(address)
            };
        },
        onDisconnect() {
            // console.log('A wallet has successfully disconnected from Sesame.')
            isSesame(null)
        },
    })

    return (
        <SesameContext.Provider value={value}>
            {children}
        </SesameContext.Provider>
    );
}

export function useSesameContext() {
    return useContext(SesameContext);
}