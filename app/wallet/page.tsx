"use client"
import { Account } from "@/components/account";
import { WalletOptions } from "@/components/walletOption";
import { useAccount } from "wagmi";
import { Tabs, Tab } from "@nextui-org/tabs";
import { SendTransaction } from "@/components/send-transaction";

export default function WalletPage() {
    const { isConnected } = useAccount()
    return (
        <Tabs>
            <Tab key="connect" title="Connect">
                {isConnected ? <Account /> : <WalletOptions />}
            </Tab>
            <Tab key="send" title="Send">
                <SendTransaction />
            </Tab>
        </Tabs>
    )
}
