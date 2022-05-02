import { useTranslation } from "react-i18next"
import { useProposal } from "data/queries/gov"
import { Auto, Page, Card } from "components/layout"
import useProposalId from "pages/claim/useProposalId"
import ProposalHeader from "pages/claim/ProposalHeader"
import TxContext from "../TxContext"
import DepositForm from "./DepositForm"

const DepositTx = () => {
  const { t } = useTranslation()
  const id = useProposalId()
  const { data: proposal, ...state } = useProposal(id)

  return (
    <Page title={t("Deposit")}>
      <Auto
        columns={[
          <Card>
            <TxContext>
              <DepositForm />
            </TxContext>
          </Card>,
          <Card {...state}>
            {proposal && <ProposalHeader proposal={proposal} />}
          </Card>,
        ]}
      />
    </Page>
  )
}

export default DepositTx
