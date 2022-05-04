import type { NextPage } from "next"
import { LCDClient } from "@terra-money/terra.js"
import { useConnectedWallet } from "@terra-money/wallet-provider"
import WalletLoader from "components/WalletLoader"
import { useSigningClient } from "contexts/cosmwasm"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "utils/hooks/useRouter"
import ProposalCard from "components/ProposalCard"
import { ProposalListResponse, ProposalResponse, Timestamp } from "types/cw3"
import { useNavigate } from "react-router-dom"

// TODO: review union Expiration from types/cw3
type Expiration = {
  at_time: Timestamp
}

const Home: NextPage = () => {
  const router = useRouter()
  const navigate = useNavigate()
  const multisigAddress = router.query.multisigAddress as string
  console.log(multisigAddress)

  const connectedWallet = useConnectedWallet()

  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null
    }

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    })
  }, [connectedWallet])

  const { walletAddress, signingClient } = useSigningClient()
  const [reversedProposals, setReversedProposals] = useState<
    ProposalResponse[]
  >([])
  const [hideLoadMore, setHideLoadMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startBefore, setStartBefore] = useState<number | null>(null)

  useEffect(() => {
    if (!connectedWallet || !lcd) {
      setReversedProposals([])
      setHideLoadMore(false)
      return
    }
    setLoading(true)

    lcd.wasm
      .contractQuery(multisigAddress, {
        reverse_proposals: {
          ...(startBefore && { start_before: startBefore }),
          limit: 10,
        },
      })
      // TODO: Type return
      .then((response: any) => {
        if (response.proposals.length < 10) {
          setHideLoadMore(true)
        }
        setReversedProposals(reversedProposals.concat(response.proposals))
      })
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false)
        console.log("err", err)
      })
  }, [walletAddress, signingClient, multisigAddress, startBefore, lcd])

  return (
    <WalletLoader loading={reversedProposals.length === 0 && loading}>
      <div className="flex flex-col w-96 lg:w-6/12 max-w-full px-2 py-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-bold sm:text-3xl">Proposals</h1>
          <button
            className="btn btn-primary btn-sm text-lg"
            onClick={() =>
              navigate(`/${encodeURIComponent(multisigAddress)}/create`)
            }
          >
            + Create
          </button>
        </div>
      </div>
      <div className="w-96 lg:w-6/12 max-w-full">
        {reversedProposals.length === 0 && (
          <div className="text-center">
            No proposals found, please create a proposal.
          </div>
        )}
        {reversedProposals.map((proposal, idx) => {
          const { title, id, status } = proposal
          const expires = proposal.expires as Expiration

          return (
            <ProposalCard
              key={id}
              title={title}
              id={`${id}`}
              status={status}
              expires_at={parseInt(expires.at_time)}
              multisigAddress={multisigAddress}
            />
          )
        })}
        {!hideLoadMore && (
          <button
            className="btn btn-primary btn-outline text-lg w-full mt-2"
            onClick={() => {
              const proposal = reversedProposals[reversedProposals.length - 1]
              setStartBefore(proposal.id)
            }}
          >
            Load More
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-around md:max-w-4xl mt-6 sm:w-full">
        <a
          rel="noopener noreferrer"
          href={`https://finder.terra.money/columbus-5/address/${multisigAddress}`}
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Block explorer &rarr;</h3>
        </a>
      </div>
      <div></div>
    </WalletLoader>
  )
}

export default Home
