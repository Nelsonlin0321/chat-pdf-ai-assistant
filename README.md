# ChatPDF: Full Stack Implementation to Build an RAG (Retrieval Augmented Generation) Application with with Reoccurring Revenue

## Introduction
The ChatPDF application is based on the [`youtube video`](https://www.youtube.com/watch?v=r895rFUbGtE&t=15158s) with the secondary development.   
The application allow users to upload PDF document and ask questions related to the selected document. It achieves this by retrieving pertinent data or documents related to a specific question or task and utilizing them as contextual information for the LLM.

## Highlights
- MongoDB Atlas for storag, vector search, keyword search and customized hybrid search.
- Backend APIs for file uploading,context retrieval deployed by CloudRun and AWS Lambda.
- Google Genimi API for chat generation
- Purely chat mode available to disable reading PDF
- Jina AI for embedding and retrieving reranking
- UI optimizations for model devices


## Preview

[`www.chat-pdf-ai.com`](www.chat-pdf-ai.com)

<img src = "images/preview.gif">


## Overall Architecture



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


