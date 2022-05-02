import { useTranslation } from "react-i18next"
import { LinkButton } from "components/general"
import { Page } from "components/layout"
import Proposals from "./Proposals"

const Claim = () => {
  const { t } = useTranslation()

  return (
    <Page
      title="Claims"
      extra={
        <LinkButton to="/proposal/new" color="primary" size="small">
          {t("New proposal")}
        </LinkButton>
      }
    >
      <Proposals />
    </Page>
  )
}

export default Claim
