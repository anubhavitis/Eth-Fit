import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WagmiMintExample
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export const wagmiMintExampleABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ERC721EnumerableForbiddenBatchMint",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "ERC721OutOfBoundsIndex",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_fromTokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_toTokenId",
        "type": "uint256"
      }
    ],
    "name": "BatchMetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "MetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userNfts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export const wagmiMintExampleAddress = {
  42220: '',
  44787: '0x631fb094399d362889c324472C83581B2BB45617',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export const wagmiMintExampleConfig = {
  address: wagmiMintExampleAddress,
  abi: abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"getApproved"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"ownerOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"supportsInterface"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"tokenURI"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abi}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof abi, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof abi,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof abi,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abi}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abi,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof abi,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abi, TFunctionName, TMode>({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abi,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof abi, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abi, 'approve', TMode>({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abi,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof abi, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abi, 'mint', TMode>({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abi,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<
        typeof abi,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof abi,
    'safeTransferFrom',
    TMode
  >({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abi,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<
        typeof abi,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof abi,
    'setApprovalForAll',
    TMode
  >({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abi,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<
        typeof abi,
        'transferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abi, 'transferFrom', TMode>({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abi}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function usePrepareWagmiMintExampleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abi, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof abi, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function usePrepareWagmiMintExampleApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abi, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abi, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function usePrepareWagmiMintExampleMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abi, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'safeMint',

    ...config,
  } as UsePrepareContractWriteConfig<typeof abi, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function usePrepareWagmiMintExampleSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof abi,
      'safeTransferFrom'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof abi,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function usePrepareWagmiMintExampleSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof abi,
      'setApprovalForAll'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof abi,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abi}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function usePrepareWagmiMintExampleTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abi, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof abi,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abi}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof abi, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as UseContractEventConfig<typeof abi, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abi}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof abi, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof abi, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abi}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof abi, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof abi, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abi}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 */
export function useWagmiMintExampleTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof abi, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abi,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof abi, 'Transfer'>)
}
