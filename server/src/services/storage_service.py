import chromadb
from chromadb.config import Settings
import os

class VectorStore:
    def __init__(self):
        self.client = chromadb.Client(Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory="vector_store"
        ))
        self.collection = self.client.create_collection(
            name="document_store",
            metadata={"hnsw:space": "cosine"}
        )
    
    def add_documents(self, texts, metadata=None):
        """Add documents to the vector store"""
        from ..RAG.embeddings import embed_texts
        
        embeddings = embed_texts(texts)
        ids = [f"doc_{i}" for i in range(len(texts))]
        
        self.collection.add(
            embeddings=embeddings.tolist(),
            documents=texts,
            ids=ids,
            metadatas=[metadata or {}] * len(texts)
        )
        
    def query_similar(self, query_text, n_results=3):
        """Find similar documents for a query"""
        from ..RAG.embeddings import embed_texts
        
        query_embedding = embed_texts([query_text])[0]
        results = self.collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=n_results
        )
        
        return results["documents"][0]  # Return the most similar documents 