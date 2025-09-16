import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.db.database import init_db_from_sql
from server.api import router as api_router
from server.db.models.user import Base   # 👈 importa el Base que contiene tus modelos
from server.db.session import engine  # 👈 importa el engine de la base de datos

app = FastAPI()

origins = [
    "http://localhost:5173",
    "*"
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
    #Base.metadata.drop_all(bind=engine)
    #Base.metadata.create_all(bind=engine)  # 👈 crea las tablas si no existen

app.include_router(api_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 