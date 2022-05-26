from pydantic import BaseModel, Field
from typing import Optional
from uuid import uuid4


def generate_projectID():
    return str(uuid4())


class ProjectPosition(BaseModel):
    position: str
    req_person: int


class Project(BaseModel):
    project_id: str = Field()
    manager_id: str
    member_id: Optional[set]
    required_position: list
    required_person: int
    tech_stack: Optional[set]