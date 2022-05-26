from .db import dynamodb
from .tech import get_proj_tech
from typing import Optional
from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse
from boto3.dynamodb.conditions import Key
from .similarity import jacard_sim, cosine_sim

table = dynamodb.Table("user_info")


def create_user(user: dict):
    try:
        table.put_item(Item=user)
        return user
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def get_user(user_id: str):
    try:
        response = table.query(
            KeyConditionExpression=Key("user_id").eq(user_id)
        )
        return response["Items"]
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def get_users(limit=5):
    try:
        response = table.scan(
            Limit=limit,
            AttributesToGet=["user_id", "position_score", "previous_project", "tech_stack"]
        )
        return response["Items"]
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def delete_user(user: dict):
    try:
        response = table.delete_item(
            Key={
                "user_id": user['user_id']
            }
        )
        return response
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def update_user(user: dict):
    try:
        UpdateExpression = "SET "
        ExpressionAttributeValues = {}

        if user["position_score"] is not None:
            UpdateExpression += "position_score = :position_score,"
            ExpressionAttributeValues[":position_score"] = user["position_score"]

        if user["previous_project"] is not None:
            UpdateExpression += "previous_project = :previous_project,"
            ExpressionAttributeValues[":previous_project"] = user["previous_project"]

        if user["tech_stack"] is not None:
            UpdateExpression += "tech_stack = :tech_stack,"
            ExpressionAttributeValues[":tech_stack"] = user["tech_stack"]

        UpdateExpression = UpdateExpression.rstrip(",")

        response = table.update_item(
            Key={
                "user_id": user["user_id"]
            },
            UpdateExpression = UpdateExpression,
            # UpdateExpression="SET position_score = :position_score, previous_project = :previous_project, tech_stack = :tech_stack",
            # ExpressionAttributeValues={
                # ":position_score": user["position_score"],
                # ":previous_project": user["previous_project"],
                # ":tech_stack": user["tech_stack"]
            # }
            ExpressionAttributeValues = ExpressionAttributeValues
        )
        return response
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


# input user_id, get matched project_id
def get_user_proj(uid: str, num: int):
    try:
        global users, projects

        response = table.scan(
            AttributesToGet=["user_id", "tech_stack"]
        )
        response['Items'].sort(key=lambda x:int(x["user_id"]))

        users = response['Items']
        projects = get_proj_tech()

        users = [user for user in users if "tech_stack" in user]
        projects = [project for project in projects if "tech_stack" in project and uid != project["manager_id"] and uid not in project["member_id"]]

        user_jsim = dict()
        for user in users:
            user_jsim[user['user_id']] = {proj['project_id']:cosine_sim(user['tech_stack'], proj['tech_stack']) for proj in projects}
            user_jsim[user['user_id']] = dict(sorted(user_jsim[user['user_id']].items(), key=lambda x:x[1], reverse=True))

        # if project not in dict, return empty list
        if uid not in user_jsim:
            return []

        result = list(user_jsim[uid].items())
        result = dict([ele for ele in result if ele[1] != 0])
        if len(list(result.keys())) > num:
            return list(result.keys())[:num]
        else:
            return list(result.keys())



    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)