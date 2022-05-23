from .db import dynamodb
from typing import Optional
from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse
from boto3.dynamodb.conditions import Key

user_table = dynamodb.Table("user_info")
proj_table = dynamodb.Table("project_info")


# get users id, tech_stack
def get_user_tech():
        try:
            response = user_table.scan(
                AttributesToGet=["user_id", "tech_stack"]
            )
            response['Items'].sort(key=lambda x:int(x["user_id"]))
            users = response['Items']

            return users

        except ClientError as e:
            return JSONResponse(content=e.response["Error"], status_code=500)


# get users id, tech_stack
def get_proj_tech():
        try:
            response = proj_table.scan(
                AttributesToGet=["project_id", "tech_stack"]
            )
            response['Items'].sort(key=lambda x:int(x["project_id"]))
            projects = response['Items']

            return projects

        except ClientError as e:
            return JSONResponse(content=e.response["Error"], status_code=500)
