from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, FileSerializer
from .models import Room
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from langchain.chat_models import ChatOpenAI
import openai
from langchain.chains import RetrievalQA
import assemblyai as aai
from dotenv import load_dotenv
import os

from decouple import config
#os.environ['LANGCHAIN_TRACING_V2'] = 'true'
#os.environ['LANGCHAIN_ENDPOINT'] = 'https://api.smith.langchain.com'
openai.api_key = settings.OPENAI_API_KEY
langchain_api_key = os.getenv('LANGCHAIN_API_KEY', 'default_langchain_key')
#openai_api_key = os.getenv('OPENAI_API_KEY', 'default_openai_key')
model_name = "gpt-3.5-turbo"
# Set the environment variables explicitly
os.environ['LANGCHAIN_API_KEY'] = langchain_api_key
#os.environ['OPENAI_API_KEY'] = openai_api_key

import bs4
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
import assemblyai as aai
from langchain_postgres.vectorstores import PGVector
from langchain_core.document_loaders import BaseLoader
from langchain.schema import Document

load_dotenv()
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found'}, status.HTTP_404_NOT_FOUND)
        return Response({'Bad Rquest': 'Code paramater not found'}, status=status.HTTP_400_BAD_REQUEST)


class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class AudioFileView(APIView):
    serializer_class = FileSerializer

    
    def post(self, request, format=None):
        def get_postgresql_connection_string():
            db_settings = settings.DATABASES['default']
            return f"postgresql+psycopg2://{db_settings['USER']}:{db_settings['PASSWORD']}@{db_settings['HOST']}:{db_settings['PORT']}/{db_settings['NAME']}"
        data = request.data.copy()
        audiofile = request.FILES['audio_file']
        print("-----" + str(audiofile))
        serializer = self.serializer_class(data=request.data)
        #print(serializer.data)
        data.update(request.FILES)
        print(serializer.is_valid())
        if serializer.is_valid():
            audio_name = data.get('audio_name')
            audio_file = data.get('audio_file')
            print(audio_name)
            

            aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
            transcriber = aai.Transcriber()

            transcript = transcriber.transcribe(audio_file)
            print(transcript.text)
            # transcript = transcriber.transcribe("./my-local-audio-file.wav")

            class StringDocumentLoader(BaseLoader):
                def __init__(self, text: str):
                    self.text = text

                def load(self):
                    # Create a single Document from the string
                    return [Document(page_content=self.text)]

            # Example usage
            loader = StringDocumentLoader(transcript.text)
            documents = loader.load()

            print(documents)

            docs = loader.load()
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            splits = text_splitter.split_documents(docs)

            print(len(splits))

            embeddings = OpenAIEmbeddings()
            # vector = embeddings.embed_query("Hi my name is Manan")

            # doc_vectors = embeddings.embed_documents([t.page_content for t in splits])

            # print(len(doc_vectors))

            connection = get_postgresql_connection_string()
            COLLECTION_NAME = audio_name
            db = PGVector(embeddings=embeddings, collection_name=COLLECTION_NAME, connection=connection, use_jsonb=True)
            db.add_documents(splits)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class MessageView(APIView):
    def post(self, request, format=None):
        def get_postgresql_connection_string():
            db_settings = settings.DATABASES['default']
            return f"postgresql+psycopg2://{db_settings['USER']}:{db_settings['PASSWORD']}@{db_settings['HOST']}:{db_settings['PORT']}/{db_settings['NAME']}"
        data=request.data
        print(data.get('input'))
        llm = ChatOpenAI(model_name=model_name, temperature=0)
        connection = get_postgresql_connection_string()
        COLLECTION_NAME = "my_audio"
        embeddings = OpenAIEmbeddings()
        prompt = hub.pull("rlm/rag-prompt")
        db = PGVector(embeddings=embeddings, collection_name=COLLECTION_NAME, connection=connection, use_jsonb=True)
        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)
        retriever = db.as_retriever(
            search_kwargs={"k": 10}
            )
        # qa_stuff = RetrievalQA.from_chain_type(
        #     llm=llm, 
        #     chain_type="stuff", 
        #     retriever=retriever,
        #     verbose=True,
        # )
        
        query = data.get('input')
        # response = qa_stuff.run(query)
        rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
        
        print(rag_chain.invoke(query))
        #print(response)
        return Response(status=status.HTTP_200_OK)
