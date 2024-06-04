import * as React from 'react'
import {
    type BaseError,
    useSendTransaction,
    useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@nextui-org/button'

export function SendTransaction() {
    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction()

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const to = formData.get('address') as `0x${string}`
        const value = formData.get('value') as string
        sendTransaction({ to, value: parseEther(value) })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    return (
        <form onSubmit={submit}>
            <input name="address" placeholder="0xA0Cf…251e" required />
            <br />
            <br />
            <input name="value" placeholder="0.05" required />
            <br />
            <Button
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Send'}
            </Button>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming ? <div>Waiting for confirmation...</div> : <div>Transaction confirmed.</div>}
            {error && (
                <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
        </form>
    )
}