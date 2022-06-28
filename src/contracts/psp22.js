const psp22_contract = {
  CONTRACT_ADDRESS: "5GdubX7jhRzikwa3rFN4ppzFidAxciWkpJAWoR7MWJPZNsXS",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x2133ace44087a97b05b2b959b5edd6668ba67fd606889ddfddcbf67f2f28c0e4",
      "language": "ink! 3.2.0",
      "compiler": "rustc 1.63.0-nightly"
    },
    "contract": {
      "name": "bet_token",
      "version": "1.1.1",
      "authors": [
        "bet_a0 <admin@betA0.net>"
      ]
    },
    "V3": {
      "spec": {
        "constructors": [
          {
            "args": [
              {
                "label": "inital_supply",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 4
                }
              },
              {
                "label": "cap",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 4
                }
              },
              {
                "label": "minter",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [],
            "label": "new",
            "payable": false,
            "selector": "0x9bae9d5e"
          }
        ],
        "docs": [],
        "events": [],
        "messages": [
          {
            "args": [
              {
                "label": "amount",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [],
            "label": "burn",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 10
            },
            "selector": "0xb1efc17b"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "amount",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              "Mint token, only Minter"
            ],
            "label": "mint",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 10
            },
            "selector": "0xcfdd9aa2"
          },
          {
            "args": [
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " Withdraw any Balance of Contract - only Owner"
            ],
            "label": "withdraw",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 10
            },
            "selector": "0x410fcc9d"
          },
          {
            "args": [
              {
                "label": "minter",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Returns the token's cap"
            ],
            "label": "set_minter",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 10
            },
            "selector": "0x46b65d02"
          },
          {
            "args": [],
            "docs": [
              " Returns the token's cap"
            ],
            "label": "minter",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            },
            "selector": "0xeaed2425"
          },
          {
            "args": [],
            "docs": [
              " Returns the token's cap"
            ],
            "label": "cap",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            },
            "selector": "0xb00b03c6"
          },
          {
            "args": [],
            "docs": [
              " Function which changes state to unpaused if paused and vice versa"
            ],
            "label": "change_state",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 10
            },
            "selector": "0x300f90c8"
          },
          {
            "args": [],
            "docs": [
              " Returns true if the contract is paused, and false otherwise."
            ],
            "label": "Pausable::paused",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "pausable_external",
                "PausedOutput"
              ],
              "type": 9
            },
            "selector": "0xd123ce11"
          },
          {
            "args": [
              {
                "label": "spender",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "ApproveInput1"
                  ],
                  "type": 0
                }
              },
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "ApproveInput2"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " Allows `spender` to withdraw from the caller's account multiple times, up to",
              " the `value` amount.",
              "",
              " If this function is called again it overwrites the current allowance with `value`.",
              "",
              " An `Approval` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns `ZeroSenderAddress` error if sender's address is zero.",
              "",
              " Returns `ZeroRecipientAddress` error if recipient's address is zero."
            ],
            "label": "PSP22::approve",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "ApproveOutput"
              ],
              "type": 10
            },
            "selector": "0xb20f1bbd"
          },
          {
            "args": [
              {
                "label": "from",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferFromInput1"
                  ],
                  "type": 0
                }
              },
              {
                "label": "to",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferFromInput2"
                  ],
                  "type": 0
                }
              },
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferFromInput3"
                  ],
                  "type": 4
                }
              },
              {
                "label": "data",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferFromInput4"
                  ],
                  "type": 13
                }
              }
            ],
            "docs": [
              " Transfers `value` tokens on the behalf of `from` to the account `to`",
              " with additional `data` in unspecified format.",
              "",
              " This can be used to allow a contract to transfer tokens on ones behalf and/or",
              " to charge fees in sub-currencies, for example.",
              "",
              " On success a `Transfer` and `Approval` events are emitted.",
              "",
              " # Errors",
              "",
              " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
              " for the caller to withdraw from `from`.",
              "",
              " Returns `InsufficientBalance` error if there are not enough tokens on",
              " the the account Balance of `from`.",
              "",
              " Returns `ZeroSenderAddress` error if sender's address is zero.",
              "",
              " Returns `ZeroRecipientAddress` error if recipient's address is zero."
            ],
            "label": "PSP22::transfer_from",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "TransferFromOutput"
              ],
              "type": 10
            },
            "selector": "0x54b3c76e"
          },
          {
            "args": [
              {
                "label": "owner",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "AllowanceInput1"
                  ],
                  "type": 0
                }
              },
              {
                "label": "spender",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "AllowanceInput2"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Returns the amount which `spender` is still allowed to withdraw from `owner`.",
              "",
              " Returns `0` if no allowance has been set `0`."
            ],
            "label": "PSP22::allowance",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "AllowanceOutput"
              ],
              "type": 4
            },
            "selector": "0x4d47d921"
          },
          {
            "args": [
              {
                "label": "owner",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "BalanceOfInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Returns the account Balance for the specified `owner`.",
              "",
              " Returns `0` if the account is non-existent."
            ],
            "label": "PSP22::balance_of",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "BalanceOfOutput"
              ],
              "type": 4
            },
            "selector": "0x6568382f"
          },
          {
            "args": [
              {
                "label": "spender",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "IncreaseAllowanceInput1"
                  ],
                  "type": 0
                }
              },
              {
                "label": "delta_value",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "IncreaseAllowanceInput2"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " Atomically increases the allowance granted to `spender` by the caller.",
              "",
              " An `Approval` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns `ZeroSenderAddress` error if sender's address is zero.",
              "",
              " Returns `ZeroRecipientAddress` error if recipient's address is zero."
            ],
            "label": "PSP22::increase_allowance",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "IncreaseAllowanceOutput"
              ],
              "type": 10
            },
            "selector": "0x96d6b57a"
          },
          {
            "args": [
              {
                "label": "spender",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "DecreaseAllowanceInput1"
                  ],
                  "type": 0
                }
              },
              {
                "label": "delta_value",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "DecreaseAllowanceInput2"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " Atomically decreases the allowance granted to `spender` by the caller.",
              "",
              " An `Approval` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
              " by owner for `spender`.",
              "",
              " Returns `ZeroSenderAddress` error if sender's address is zero.",
              "",
              " Returns `ZeroRecipientAddress` error if recipient's address is zero."
            ],
            "label": "PSP22::decrease_allowance",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "DecreaseAllowanceOutput"
              ],
              "type": 10
            },
            "selector": "0xfecb57d5"
          },
          {
            "args": [
              {
                "label": "to",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferInput1"
                  ],
                  "type": 0
                }
              },
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferInput2"
                  ],
                  "type": 4
                }
              },
              {
                "label": "data",
                "type": {
                  "displayName": [
                    "psp22_external",
                    "TransferInput3"
                  ],
                  "type": 13
                }
              }
            ],
            "docs": [
              " Transfers `value` amount of tokens from the caller's account to account `to`",
              " with additional `data` in unspecified format.",
              "",
              " On success a `Transfer` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns `InsufficientBalance` error if there are not enough tokens on",
              " the caller's account Balance.",
              "",
              " Returns `ZeroSenderAddress` error if sender's address is zero.",
              "",
              " Returns `ZeroRecipientAddress` error if recipient's address is zero."
            ],
            "label": "PSP22::transfer",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "TransferOutput"
              ],
              "type": 10
            },
            "selector": "0xdb20f9f5"
          },
          {
            "args": [],
            "docs": [
              " Returns the total token supply."
            ],
            "label": "PSP22::total_supply",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp22_external",
                "TotalSupplyOutput"
              ],
              "type": 4
            },
            "selector": "0x162df8c2"
          },
          {
            "args": [],
            "docs": [
              " Leaves the contract without owner. It will not be possible to call",
              " owner's functions anymore. Can only be called by the current owner.",
              "",
              " NOTE: Renouncing ownership will leave the contract without an owner,",
              " thereby removing any functionality that is only available to the owner.",
              "",
              " On success a `OwnershipTransferred` event is emitted.",
              "",
              " # Errors",
              "",
              " Panics with `CallerIsNotOwner` error if caller is not owner"
            ],
            "label": "Ownable::renounce_ownership",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "RenounceOwnershipOutput"
              ],
              "type": 14
            },
            "selector": "0x5e228753"
          },
          {
            "args": [
              {
                "label": "new_owner",
                "type": {
                  "displayName": [
                    "ownable_external",
                    "TransferOwnershipInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Transfers ownership of the contract to a `new_owner`.",
              " Can only be called by the current owner.",
              "",
              " On success a `OwnershipTransferred` event is emitted.",
              "",
              " # Errors",
              "",
              " Panics with `CallerIsNotOwner` error if caller is not owner.",
              "",
              " Panics with `NewOwnerIsZero` error if new owner's address is zero."
            ],
            "label": "Ownable::transfer_ownership",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "TransferOwnershipOutput"
              ],
              "type": 14
            },
            "selector": "0x11f43efd"
          },
          {
            "args": [],
            "docs": [
              " Returns the address of the current owner."
            ],
            "label": "Ownable::owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "OwnerOutput"
              ],
              "type": 0
            },
            "selector": "0x4fa43c8c"
          }
        ]
      },
      "storage": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x238cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                          "ty": 0
                        }
                      },
                      "name": "owner"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x248cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x258cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                                      "ty": 3
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "ownable"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0xb35c9a7cdda1f825a6ed889040b074ca5a2f83461f5e7ecf5794400920e6bf3c",
                          "ty": 4
                        }
                      },
                      "name": "supply"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xb45c9a7cdda1f825a6ed889040b074ca5a2f83461f5e7ecf5794400920e6bf3c",
                          "ty": 5
                        }
                      },
                      "name": "balances"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xb55c9a7cdda1f825a6ed889040b074ca5a2f83461f5e7ecf5794400920e6bf3c",
                          "ty": 7
                        }
                      },
                      "name": "allowances"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xb65c9a7cdda1f825a6ed889040b074ca5a2f83461f5e7ecf5794400920e6bf3c",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xb75c9a7cdda1f825a6ed889040b074ca5a2f83461f5e7ecf5794400920e6bf3c",
                                      "ty": 3
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "psp22"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x9f7aa12448a3594eab26c974e0d052538472255c6f08c7d68e564c9d88101455",
                          "ty": 9
                        }
                      },
                      "name": "paused"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xa07aa12448a3594eab26c974e0d052538472255c6f08c7d68e564c9d88101455",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xa17aa12448a3594eab26c974e0d052538472255c6f08c7d68e564c9d88101455",
                                      "ty": 3
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "pause"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "ty": 4
                }
              },
              "name": "cap"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 0
                }
              },
              "name": "minter"
            }
          ]
        }
      },
      "types": [
        {
          "id": 0,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 1,
                    "typeName": "[u8; 32]"
                  }
                ]
              }
            },
            "path": [
              "ink_env",
              "types",
              "AccountId"
            ]
          }
        },
        {
          "id": 1,
          "type": {
            "def": {
              "array": {
                "len": 32,
                "type": 2
              }
            }
          }
        },
        {
          "id": 2,
          "type": {
            "def": {
              "primitive": "u8"
            }
          }
        },
        {
          "id": 3,
          "type": {
            "def": {
              "tuple": []
            }
          }
        },
        {
          "id": 4,
          "type": {
            "def": {
              "primitive": "u128"
            }
          }
        },
        {
          "id": 5,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 6,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 0
              },
              {
                "name": "V",
                "type": 4
              }
            ],
            "path": [
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 6,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 1,
                    "typeName": "[u8; 32]"
                  }
                ]
              }
            },
            "path": [
              "ink_primitives",
              "Key"
            ]
          }
        },
        {
          "id": 7,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 6,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 8
              },
              {
                "name": "V",
                "type": 4
              }
            ],
            "path": [
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 8,
          "type": {
            "def": {
              "tuple": [
                0,
                0
              ]
            }
          }
        },
        {
          "id": 9,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 11
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 3
              },
              {
                "name": "E",
                "type": 11
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 11,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 12,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "InsufficientBalance"
                  },
                  {
                    "index": 2,
                    "name": "InsufficientAllowance"
                  },
                  {
                    "index": 3,
                    "name": "ZeroRecipientAddress"
                  },
                  {
                    "index": 4,
                    "name": "ZeroSenderAddress"
                  },
                  {
                    "fields": [
                      {
                        "type": 12,
                        "typeName": "String"
                      }
                    ],
                    "index": 5,
                    "name": "SafeTransferCheckFailed"
                  }
                ]
              }
            },
            "path": [
              "openbrush_contracts",
              "traits",
              "errors",
              "psp22",
              "PSP22Error"
            ]
          }
        },
        {
          "id": 12,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 13,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
            }
          }
        },
        {
          "id": 14,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 15
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 3
              },
              {
                "name": "E",
                "type": 15
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "CallerIsNotOwner"
                  },
                  {
                    "index": 1,
                    "name": "NewOwnerIsZero"
                  }
                ]
              }
            },
            "path": [
              "openbrush_contracts",
              "traits",
              "errors",
              "ownable",
              "OwnableError"
            ]
          }
        }
      ]
    }
  }
};

export default psp22_contract;
