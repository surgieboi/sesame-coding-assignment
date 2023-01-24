import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'

import { useSesameContext } from '../context/sesame'

import { addCoupon } from '../functions/addCoupon'
import { verifyUser } from '../functions/verifyUser'

import Layout from '../components/layout/layout'

export default function Index() {

  var randomstring = require("randomstring");

  const { sesame, isSesame } = useSesameContext()

  const discordName = process.env.NEXT_PUBLIC_DISCORD_NAME
  const oauth2URL = process.env.NEXT_PUBLIC_DISCORD_OAUTH2_URL

  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onMutate(connector) {
      // console.log('Before Connect', connector)
      isFetching(true)
    },
    onSuccess(data) {
      // console.log('Connect', data)
      setTimeout(() => {
        isFetching(false)
      }, 1000);
    }
  })
  const { disconnect } = useDisconnect()
  const [ hasMounted, setHasMounted] = useState(false)

  const [ fetching, isFetching ] = useState(false)

  const [access, setAccess] = useState('')
  const [token, setToken] = useState('')
  const [guilds, setGuilds] = useState([])

  const [connecting, isConnecting] = useState(false)
  const [verifying, isVerifying] = useState(false)
  const [verified, isVerified] = useState(false)

  const [coupon, setCoupon] = useState('')
  const [copied, isCopied] = useState(false)

  const router = useRouter()

  const discordConnection = async () => {
    router.push(oauth2URL)
    isConnecting(true)
  }

  const verificationCheck = async () => {
    fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `${token} ${access}`,
      },
    })
      .then(isVerifying(true))
      .then(result => result.json())
      .then(response => {
        // console.log(response)
        
        setGuilds(response, response?.map(guild => (guild.name == discordName) ? isVerified(true) : null))
        
        const couponCode = randomstring.generate(12)

        isSesame(prevState => ({
          sesame: {
            ...prevState,
            coupon_code: couponCode,
            is_verified: true
          }
        }))

        addCoupon(address, couponCode)
        verifyUser(address)
        setCoupon(couponCode)
        isVerifying(false)

      })
      .catch(console.error)
  }

  const copyCoupon = async () => {
    isCopied(true)
    navigator.clipboard.writeText(coupon)
    // console.log(sesame)
    setTimeout(() => {
      isCopied(false)
    }, 1500)
  }

  useEffect(() => {
    setHasMounted(true)

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    // console.log(fragment, accessToken, tokenType)

    setAccess(accessToken)
    setToken(tokenType)

  }, []);

  if (fetching) return <><p style={{ display: 'block', width: '100%', marginTop: '180px', textAlign: 'center' }}>Loading...</p></>

  if (!hasMounted) return null;

  if (isConnected) {
    return (
      <>
        <div className="w-full flex flex-col items-center mt-[210px] mb-[120px]">

          <h1 className="mb-1 md:mb-2 text-3xl md:text-5xl font-bold text-center">Join our Discord</h1>
          <h3 className="text-center mb-5 text-base">Confirm that you are a member on our server:</h3>

          <button
            disabled={(access && token) || (sesame?.wallet && sesame?.is_verified) || connecting}
            className="w-full md:w-[400px] mx-2 mb-6 p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            onClick={discordConnection}
          >
            {connecting ? (
              <>
                Connecting...
              </>
            ) : (access && token) || (sesame?.wallet && sesame?.is_connected) ? (
              <>
                Connected &#10003;
              </>
            ) : (
              <>
                Connect to Discord
              </>
            )}
          </button>

          <button
            disabled={(!access && !token) || (sesame?.wallet && sesame?.is_verified) || (verified || verifying)}
            className="w-full md:w-[400px] mx-2 mb-6 p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            onClick={verificationCheck}
          >
            {verifying ? (
              <>
                Verifying...
              </>
            ) : (verified) || (sesame?.wallet && sesame?.is_verified) ? (
              <>
                Verified &#10003;
              </>
            ) : (
              <>
                Verify Membership
              </>
            )}
          </button>

          <button
            disabled={!coupon && !sesame?.coupon_code}
            onClick={copyCoupon}
            className="w-full md:w-[400px] mx-2 mb-6 p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          >
            {(coupon && !copied) || (sesame?.wallet && sesame?.is_connected && sesame?.is_verified && sesame?.coupon_code && !copied) ? (
              <>
                {sesame?.coupon_code ? sesame?.coupon_code : coupon}
              </>
            ) : (coupon && copied) || (sesame?.wallet && sesame?.is_connected && sesame?.is_verified && sesame?.coupon_code && copied) ? (
              <>
                Copied!
              </>
            ) : (
              <>
                Complete Verficiation to View Coupon
              </>
            )}
          </button>

          <button
            className="w-full md:w-[400px] mx-2 mb-6 p-4 hover:text-white bg-white hover:bg-slate-800 border border-white hover:border-slate-800 rounded-2xl"
            onClick={disconnect}
          >
            Disconnect
          </button>

        </div>
      </>
    )
  }

  return (
    <div className="w-full md:h-screen flex flex-col items-center justify-center mt-[210px] md:mt-[0px]">
      <h1 className="mb-0 md:mb-2 text-3xl md:text-5xl font-bold text-center">Join our Discord &#38; Earn Rewards</h1>
      <h3 className="mb-6 text-lg md:text-2xl text-center">Connect your MetaMask and get started!</h3>
      <div className="w-full flex flex-col sm:flex-row justify-center">

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button
              className="w-full md:w-[400px] mx-2 mb-4 p-4 bg-slate-800 text-white hover:text-slate-800 hover:bg-transparent border border-slate-200 hover:border-slate-800 rounded-2xl"
              key={x.id}
              onClick={() => {
                connect({ connector: x });
              }}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' is connecting...'}
            </button>
          ))}
      </div>

      {error && <div className="mt-6 capitalize invalid">{error.message}</div>}

    </div>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
