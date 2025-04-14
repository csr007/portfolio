from flask import Flask, request, jsonify, redirect, url_for
import os
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Debug: Print all environment variables (excluding sensitive ones)
print("Environment variables loaded:")
for key in os.environ:
    if "KEY" not in key and "SECRET" not in key:
        print(f"{key}: {os.environ[key]}")

# Check for required environment variables
required_env_vars = ["GROQ_API_KEY"]
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    print(f"Missing environment variables: {missing_vars}")
    raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize global variables
vectors = None
llm = None

def initialize_llm():
    global llm
    try:
        llm = ChatGroq(groq_api_key=os.getenv("GROQ_API_KEY"), model_name="Llama3-8b-8192")
        print("LLM initialized successfully")
    except Exception as e:
        print(f"Error initializing LLM: {str(e)}")
        raise

def initialize_documents():
    global vectors
    try:
        # Try multiple possible PDF locations
        possible_pdf_paths = [
            os.path.join(os.path.dirname(__file__), "assets", "SathwikReddyChelemela.pdf"),
            os.path.join(os.path.dirname(__file__), "SathwikReddyChelemela.pdf"),
            os.path.join(os.getcwd(), "assets", "SathwikReddyChelemela.pdf"),
            os.path.join(os.getcwd(), "SathwikReddyChelemela.pdf")
        ]
        
        pdf_path = None
        for path in possible_pdf_paths:
            if os.path.exists(path):
                pdf_path = path
                break
                
        if not pdf_path:
            raise FileNotFoundError("PDF file not found in any of the expected locations")
            
        print(f"Found PDF at: {pdf_path}")
        
        resume_loader = PyPDFLoader(pdf_path)
        docs = resume_loader.load()
        print(f"Loaded {len(docs)} documents from PDF")
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        final_documents = text_splitter.split_documents(docs)
        print(f"Split into {len(final_documents)} chunks")
        
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectors = FAISS.from_documents(final_documents, embeddings)
        print("Vector store created successfully")
    except Exception as e:
        print(f"Error initializing document processing: {str(e)}")
        raise

# Initialize components
initialize_llm()
initialize_documents()

prompt = ChatPromptTemplate.from_template("""
Act as if you're the Person in the resume and respond casually, like a student actively searching for jobs. 
Keep explicit language to a minimum, answer sarcastically only if they use it. 
Ensure all responses are concise, accurate, and under 50 words.

If the question is personal (about hobbies, interests, lifestyle, etc.), respond with:
"For personal questions, follow me on Instagram @csr_originals"

<context>
{context}
<context>

Question: {input}
""")

@app.route("/")
def home():
    return redirect(url_for("chat"))

@app.route("/chat", methods=["POST", "GET"])
def chat():
    if request.method == "POST":
        try:
            data = request.get_json()
            print(f"Received request data: {data}")
            
            question = data.get("question", "")
            if not question:
                return jsonify({"error": "No question provided"}), 400
                
            print(f"Processing question: {question}")
            
            document_chain = create_stuff_documents_chain(llm, prompt)
            retriever = vectors.as_retriever()
            retrieval_chain = create_retrieval_chain(retriever, document_chain)
            
            response = retrieval_chain.invoke({"input": question})
            print(f"Generated response: {response['answer']}")
            
            return jsonify({"response": response["answer"]})
            
        except Exception as e:
            print(f"Error processing request: {str(e)}")
            return jsonify({"error": str(e)}), 500
            
    return jsonify({"message": "Chat endpoint is working"})

if __name__ == "__main__":
    app.run(debug=True)
