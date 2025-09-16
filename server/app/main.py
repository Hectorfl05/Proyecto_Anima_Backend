import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.db.database import init_db_from_sql


app = FastAPI()

origins = [
    "http://localhost:5173"
    #Cuando se obtenga el dominio se agrega aqui
]

#proteccion CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db_from_sql()  
    print("Database initialized from SQL script.")



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)