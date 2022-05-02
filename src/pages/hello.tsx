import type { NextPage } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import WalletLoader from "components/WalletLoader"

const Home: NextPage = () => {
  const router = useRouter()
  const [address, setAddress] = useState("")

  return (
    <WalletLoader>
      <div>
        <div>
          <h1>Open existing</h1>
          <div>
            <div>
              <input
                id="multisig-address"
                placeholder="Multisig contract address..."
                step="0.1"
                value={address}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    router.push(`/${event.currentTarget.value}`)
                  }
                }}
                onChange={(event) => setAddress(event.target.value)}
              />
              <button
                onClick={() => {
                  const inputEl = document.getElementById(
                    "multisig-address"
                  ) as HTMLInputElement
                  router.push(`/${inputEl.value}`)
                }}
              >
                GO
              </button>
            </div>
          </div>
        </div>
        <div></div>
        <div>
          <h1>New</h1>
          <div>
            <button onClick={() => router.push("/create")}>
              + CREATE NEW MULTISIG
            </button>
          </div>
        </div>
      </div>
    </WalletLoader>
  )
}

export default Home
