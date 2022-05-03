import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useRoutes } from "react-router-dom"

import { ReactComponent as WalletIcon } from "styles/images/menu/Wallet.svg"
import { ReactComponent as NFTIcon } from "styles/images/menu/NFT.svg"
import { ReactComponent as HistoryIcon } from "styles/images/menu/History.svg"
import { ReactComponent as ContractIcon } from "styles/images/menu/Contract.svg"

/* menu */
import Dashboard from "pages/dashboard/Dashboard"
import Studio from "pages/studio/Studio"
import Wallet from "pages/wallet/Wallet"
import Models from "pages/models/Studio"
import Templates from "pages/templates/Studio"
import History from "pages/history/History"
import Contract from "pages/contract/Contract"
import TemplateStudio from "pages/TemplateStudio"
import Home from "pages/index"
import CreateMultisig from "pages/create"
import ExistMultisig from "pages/[multisigAddress]/index"
import Proposal from "pages/[multisigAddress]/[proposalId]"
import ProposalCreate from "pages/[multisigAddress]/create"

/* details */
import ValidatorDetails from "pages/stake/ValidatorDetails"
import ProposalDetails from "pages/gov/ProposalDetails"

/* txs */
import SendTx from "txs/send/SendTx"
import TransferCW721Tx from "txs/wasm/TransferCW721Tx"
import SwapMultipleTx from "txs/swap/SwapMultipleTx"
import StakeTx from "txs/stake/StakeTx"
import WithdrawRewardsTx from "txs/stake/WithdrawRewardsTx"
import WithdrawCommissionTx from "txs/stake/WithdrawCommissionTx"
import SubmitProposalTx from "txs/gov/SubmitProposalTx"
import DepositTx from "txs/gov/DepositTx"
import VoteTx from "txs/gov/VoteTx"
import StoreCodeTx from "txs/wasm/StoreCodeTx"
import InstantiateContractTx from "txs/wasm/InstantiateContractTx"
import ExecuteContractTx from "txs/wasm/ExecuteContractTx"
import MigrateContractTx from "txs/wasm/MigrateContractTx"
import AnchorEarnTx from "txs/earn/AnchorEarnTx"
import SignMultisigTxPage from "pages/multisig/SignMultisigTxPage"
import PostMultisigTxPage from "pages/multisig/PostMultisigTxPage"

/* auth */
import Auth from "auth/modules/Auth"
import ManageNetworksPage from "auth/networks/ManageNetworksPage"
import AddNetworkPage from "auth/networks/AddNetworkPage"

/* settings */
import Settings from "pages/Settings"

/* labs */
import Labs from "pages/labs/Labs"

/* 404 */
import NotFound from "pages/NotFound"

const ICON_SIZE = { width: 20, height: 20 }

export const useNav = () => {
  const { t } = useTranslation()

  const menu = [
    {
      path: "/studio",
      element: <TemplateStudio />,
      title: t("Studio"),
      icon: <NFTIcon {...ICON_SIZE} />,
    },
    {
      path: "/wallet",
      element: <Wallet />,
      title: t("Wallet"),
      icon: <WalletIcon {...ICON_SIZE} />,
    },
    {
      path: "/multisig",
      element: <Home />,
      title: t("Multisig"),
      icon: <WalletIcon {...ICON_SIZE} />,
    },
    // {
    //   path: "/models",
    //   element: <Models />,
    //   title: t("Models"),
    //   icon: <WalletIcon {...ICON_SIZE} />,
    // },
    {
      path: "/history",
      element: <History />,
      title: t("History"),
      icon: <HistoryIcon {...ICON_SIZE} />,
    },
    {
      path: "/contract",
      element: <Contract />,
      title: t("Contract"),
      icon: <ContractIcon {...ICON_SIZE} />,
    },
  ]

  const routes = [
    { path: "/", element: <Dashboard /> },

    /* pages */
    ...menu,
    { path: "/validator/:address", element: <ValidatorDetails /> },
    { path: "/proposal/:id", element: <ProposalDetails /> },

    /* multisig */
    { path: "/multisig/sign", element: <SignMultisigTxPage /> },
    { path: "/multisig/post", element: <PostMultisigTxPage /> },
    { path: "/create", element: <CreateMultisig /> },
    { path: "/:multisigAddress", element: <ExistMultisig /> },
    { path: "/:multisigAddress/create", element: <ProposalCreate /> },
    { path: "/:multisigAddress/:proposalId", element: <Proposal /> },

    /* txs */
    { path: "/send", element: <SendTx /> },
    { path: "/nft/transfer", element: <TransferCW721Tx /> },
    { path: "/swap/multiple", element: <SwapMultipleTx /> },
    { path: "/stake/:address", element: <StakeTx /> },
    { path: "/rewards", element: <WithdrawRewardsTx /> },
    { path: "/commission", element: <WithdrawCommissionTx /> },
    { path: "/proposal/new", element: <SubmitProposalTx /> },
    { path: "/proposal/:id/deposit", element: <DepositTx /> },
    { path: "/proposal/:id/vote", element: <VoteTx /> },
    { path: "/contract/instantiate", element: <InstantiateContractTx /> },
    { path: "/contract/store", element: <StoreCodeTx /> },
    { path: "/contract/execute/:contract", element: <ExecuteContractTx /> },
    { path: "/contract/migrate/:contract", element: <MigrateContractTx /> },
    { path: "/earn", element: <AnchorEarnTx /> },

    /* auth */
    { path: "/auth/*", element: <Auth /> },
    { path: "/networks", element: <ManageNetworksPage /> },
    { path: "/network/new", element: <AddNetworkPage /> },
    { path: "/settings", element: <Settings /> },

    /* dev */
    { path: "/labs", element: <Labs /> },

    /* 404 */
    { path: "*", element: <NotFound /> },
  ]

  return { menu, element: useRoutes(routes) }
}

/* helpers */
export const useGoBackOnError = ({ error }: QueryState) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (error) navigate("..", { replace: true })
  }, [error, navigate])
}
