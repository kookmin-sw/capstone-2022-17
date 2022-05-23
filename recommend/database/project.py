from .db import dynamodb
from .tech import get_user_tech
from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse
from boto3.dynamodb.conditions import Key
from .jacard import jacard_sim


table = dynamodb.Table("project_info")


def create_project(project: dict):
    try:
        table.put_item(Item=project)
        return project
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def get_project(project_id: str):
    try:
        response = table.query(
            KeyConditionExpression=Key("project_id").eq(project_id)
        )
        return response["Items"]
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def get_projects(limit=5):
    try:
        response = table.scan(
            Limit=limit,
            AttributesToGet=["project_id", "manager_id", "member_id", "required_position", "requrired_person", "tech_stack"]
        )
        return response["Items"]
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def delete_project(project: dict):
    try:
        response = table.delete_item(
            Key={
                "project_id": project["project_id"]
            }
        )
        return response
    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)


def update_project(project: dict):
    try:
        UpdateExpression = "SET "
        ExpressionAttributeValues = {}

        if project["manager_id"] is not None:
            UpdateExpression += "manager_id = :manager_id,"
            ExpressionAttributeValues[":manager_id"] = project["manager_id"]

        if project["member_id"] is not None:
            UpdateExpression += "member_id = :member_id,"
            ExpressionAttributeValues[":member_id"] = project["member_id"]

        if project["required_person"] is not None:
            UpdateExpression += "required_person = :required_person,"
            ExpressionAttributeValues[":required_person"] = project["required_person"]

        if project["required_position"] is not None:
            UpdateExpression += "required_position = :required_position,"
            ExpressionAttributeValues[":required_position"] = project["required_position"]

        if project["tech_stack"] is not None:
            UpdateExpression += "tech_stack = :tech_stack,"
            ExpressionAttributeValues[":tech_stack"] = project["tech_stack"]

        UpdateExpression = UpdateExpression.rstrip(",")

        response = table.update_item(
            Key={
                "project_id": project["project_id"]
            },
            UpdateExpression = UpdateExpression,
            ExpressionAttributeValues = ExpressionAttributeValues
        )
        return response

    except ClientError as e:
        print(e)
        return JSONResponse(content=e.response["Error"], status_code=500)


# get users id, tech_stack
def get_proj_tech():
        try:
            response = table.scan(
                AttributesToGet=["project_id", "tech_stack"]
            )
            response['Items'].sort(key=lambda x:int(x["project_id"]))
            projects = response['Items']

            return projects

        except ClientError as e:
            return JSONResponse(content=e.response["Error"], status_code=500)


# input project_id, get matched user_id
def get_proj_user(pid: str, num: int):
    try:
        global users, projects

        response = table.scan(
            AttributesToGet=["project_id", "tech_stack"]
        )
        response['Items'].sort(key=lambda x:int(x["project_id"]))

        users = get_user_tech()
        projects = response['Items']

        users = [user for user in users if "tech_stack" in user]
        projects = [project for project in projects if "tech_stack" in project]


        proj_jsim = dict()
        for proj in projects:
            proj_jsim[proj['project_id']] = {user['user_id']:jacard_sim(proj['tech_stack'], user['tech_stack']) for user in users}
            proj_jsim[proj['project_id']] = dict(sorted(proj_jsim[proj['project_id']].items(), key=lambda x:x[1], reverse=True))
        result = list(proj_jsim[pid].items())
        result = dict([ele for ele in result if ele[1] != 0])
        if len(list(result.keys())) > num:
            return list(result.keys())[:num]
        else:
            return list(result.keys())



    except ClientError as e:
        return JSONResponse(content=e.response["Error"], status_code=500)

