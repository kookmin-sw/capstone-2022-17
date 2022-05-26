from fastapi import APIRouter
from models.user import User
from database.user import create_user, get_user, get_users, delete_user, update_user, get_user_proj


routes_user = APIRouter()


# CREATE USER
@routes_user.post("/create", response_model=User)
def create(user: User):
    return create_user(user.dict())


# GET USER BY ID
@routes_user.get("")
def get_by_id(id: str):
    return get_user(id)


# GET ALL USERS
@routes_user.get("/all")
def get_all():
    return get_users()


# DELETE USER
@routes_user.delete("/delete")
def delete(user: User):
    return delete_user(user.dict())


# UPDATE USER
@routes_user.patch("/update")
def update(user: User):
    return update_user(user.dict())

@routes_user.get("/recommend")
def user_match(uid:str, num:int):
    return get_user_proj(uid, num)

