import * as React from 'react'
import {
    type BaseError,
    useSendTransaction,
    useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@nextui-org/button'
import { Input } from "@nextui-org/input";
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
        <form onSubmit={submit} className='w-full'>
            <Input name="address" placeholder="0xA0Cf…251e" label="Wallet Address" isRequired />
            <br />
            <Input name="value" placeholder="0.05" label="Amount" isRequired/>
            <br />
            <Button
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Send'}
            </Button>
            <br />
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
        </form>
    )
}