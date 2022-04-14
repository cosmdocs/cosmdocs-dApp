import { useTranslation } from "react-i18next"
import DescriptionIcon from "@mui/icons-material/Description"
import { DOCUMENTATION } from "config/constants"
import { ExternalLink } from "components/general"
import { Contacts } from "components/layout"
import styles from "./Links.module.scss"

const community = {
  twitter: "https://twitter.com/cosmdocs",
  github: "https://github.com/cosmdocs",
}

const Links = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.links}>
      <div className={styles.tutorial}>
        <ExternalLink href={DOCUMENTATION} className={styles.link}>
          <DescriptionIcon style={{ fontSize: 18 }} />
          {t("Documentation")}
        </ExternalLink>
      </div>

      <div className={styles.community}>
        <Contacts contacts={community} menu />
      </div>
    </div>
  )
}

export default Links
