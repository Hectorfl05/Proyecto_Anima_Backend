import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Item(BaseModel):
    id: int
    name: str
    description: str

class Items(BaseModel):
    items: List[Item]

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

temp_memory_db = {"Items":[]}

@app.get("/items", response_model=Items)
async def get_items(): #Not sure bout async
    return Items(items=temp_memory_db["Items"])

@app.post("/items", response_model=Item)
async def add_item(item: Item):
    temp_memory_db["Items"].append(item)
    return item

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)