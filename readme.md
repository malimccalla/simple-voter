## Simple Voter

https://simple-voter-vnnwvmiivm.now.sh/

#### Prerequisites

To interact with the app in browser you must have the [metamask](https://metamask.io/) browser extension installed and have Rinkeby Test Net selected. If you do not have metamask feel free to interact with the `PollFactory` contract directly `0xb2A9158923b81B4552F984C6774fb729f9e4bdb5`.

#### Run locally

Assuming you're running yarn

```
git clone git@github.com:malimichael/simple-voter.git
cd simple-voter
yarn
yarn run compile
yarn run dev
```

Tests can be ran with `yarn run test`

#### TODO

* Make it possible to view polls without metamask using infura

- Better error handling, everyone loves spinners

- Write tests around button text and getting poll details

- Remove ethereum/build and compile on deployment
