# 塾Loop (JukuLoop)

## Description

JukuLoop is a Svelte application designed to help users practice reading and translating Japanese sentences.
It includes features for converting Romaji to Kana, displaying furigana, and checking the correctness of user input.

## Features

- Convert Romaji to Kana
- Display furigana for Japanese sentences
- Check user input for correctness
- Store sentences locally
- Navigate through sentences using keyboard events

## Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sci10n/JukuLoop.git
    cd JukuLoop
    ```

2. Install dependencies:
```sh
  npm install
  ```

### Development

To start the development server:

```sh
npm run dev
```

You can also run it with Docker with the following command:

```sh
 docker run  -v ${PWD}/jukuloop/:/app -p 5173:5173 -w /app  -it node:18 npm run-script dev -- --host 0.0.0.0
 ```