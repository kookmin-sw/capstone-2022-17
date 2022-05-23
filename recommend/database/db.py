from boto3 import resource
from os import getenv

dynamodb = resource("dynamodb",
                    aws_access_key_id=getenv("AWS_ACCESS_KEY_ID"),
                    aws_secret_access_key=getenv("AWS_SECRET_ACCESS_KEY"),
                    region_name=getenv("REGION_NAME"))


user_tables = [
    {
        "TableName": "user_info",
        "KeySchema": [
            {
                'AttributeName': 'user_id',
                'KeyType': 'HASH'
            }
        ],
        "AttributeDefinitions": [
            {
                'AttributeName': 'user_id',
                'AttributeType': 'S'
            }
        ],
    },
]

project_tables = [
    {
        "TableName": "project_info",
        "KeySchema": [
            {
                'AttributeName': 'project_id',
                'KeyType': 'HASH'
            }
        ],
        "AttributeDefinitions": [
            {
                'AttributeName': 'project_id',
                'AttributeType': 'S'
            }
        ],
    },
]


def create_tables_user():
    try:
        for table in user_tables:
            dynamodb.create_table(
                TableName=table["TableName"],
                KeySchema=table["KeySchema"],
                AttributeDefinitions=table["AttributeDefinitions"],
                BillingMode="PAY_PER_REQUEST"
            )
    except Exception as e:
        print(e)


def create_tables_project():
    try:
        for table in project_tables:
            dynamodb.create_table(
                TableName=table["TableName"],
                KeySchema=table["KeySchema"],
                AttributeDefinitions=table["AttributeDefinitions"],
                BillingMode="PAY_PER_REQUEST"
            )
    except Exception as e:
        print(e)
