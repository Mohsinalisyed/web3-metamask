import { Button } from "@nextui-org/button";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: "0x5098FC5c00a2Bb5577D581763D648fDA7C1501a6",
  });

  return (
    <div>
      {isLoading && <div>Loading balance...</div>}
      {isError && <div>Error fetching balance</div>}
      {balance && (
        <div>
          <p>
            Balance: {balance.formatted} {balance.symbol}
          </p>
        </div>
      )}
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
}
