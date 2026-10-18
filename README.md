# Test Case management

- Live demo: https://test-case-management-iota.vercel.app/

## What can this do?

- Add test case(s).
- Remove test case(s).
- Change status.
- Count test cases by each status.
- Save list on local storage.

## Why

- When I managed test cases in Excel, my team members and I sometimes wasted time fixing the sheet. When adding or removing rows, formula ranges no longer covered the new rows and the formatting broke.
- This app calculates the counts from the test case list on every render, so the results always stay correct when we add or remove test cases.
- This is a prototype, and for my learning mainly JavaScript/TypeScript/React.

## Tech stack

- vite
- React
- TypeScript
- Vercel

## How to run

- Prerequisites
  - Please make sure Node.js is installed before following steps.
    - Tested with:
      - node: v22.15.1
      - npm: 10.9.2

1. Clone this repository
   1. Run following command in any folder on your computer.

   ```bash
   git clone https://github.com/y-yuta-y/test-case-management.git
   ```

2. Install packages
   1. Move to cloned repository folder.

   ```bash
   cd test-case-management/testcase-manage-vite
   ```

   1. Install packages.

   ```bash
   npm install
   ```

3. Run as developer mode
   1. After the installation, run develop server.

   ```bash
   npm run dev
   ```

   1. Open the URL shown after the previous command and check it.

   ```text
   # example
   npm run dev

    > testcase-manage-vite@0.0.0 dev
    > vite

    VITE v8.3.3  ready in 652 ms

    ➜  Local:   http://localhost:5173/ # ← Open this URL
    ➜  Network: use --host to expose
    ➜  press h + enter to show help
   ```
