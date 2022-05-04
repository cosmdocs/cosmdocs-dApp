import { Auto, Page } from "components/layout"
import Coins from "./Coins"
import Tokens from "./Tokens"

const Wallet = () => {
  return (
    <Page title="Wallet">
      <Auto
        columns={[
          <>
            <Coins />
            <Tokens />
          </>,
          <></>,
        ]}
      />
    </Page>
  )
}

export default Wallet
