# Browser Storage Security

This repo includes two sample applications showcasing browser storage nuances.

## How to use

1. Clone the repo: `git@github.com:esarafianou/browser-storage.git`
2. Install the dependencies:
```
cd browser-storage
npm install
```

### Local vs Session Storage

The application walks you through the differences between Local and Session Storage

1. `cd localvsSessionStorage`
2. Run `node server.js`
3. Visit http://localhost:4000
4. Follow the instructions presented there


### In-memory storage

This applcation has a DOM-based XSS and demonstrates different in-memory
storage implementations and their insecurities against XSS.

1. `cd inMemory`
2. Run `node server.js`
3. Visit http://localhost:3000
