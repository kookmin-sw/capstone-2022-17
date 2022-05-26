from pydantic import BaseModel, Field
from typing import Optional
from uuid import uuid4


def generate_userID():
    return str(uuid4())


class Pos_score(BaseModel):
    position: str
    score: int

class User(BaseModel):
    user_id: str =  Field(default_factory=generate_userID)
    position_score: Optional[list]
    previous_project: Optional[set]
    tech_stack: Optional[set]
