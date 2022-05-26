from botocore.exceptions import ClientError
from boto3 import resource
from os import getenv

def jacard_sim(user: set, proj: set):
    if user is None or proj is None:
        return 0
    else:
        return float(len(user.intersection(proj)) / len(user.union(proj)))


# dynamodb = resource("dynamodb",
                    # aws_access_key_id=getenv("AWS_ACCESS_KEY_ID"),
                    # aws_secret_access_key=getenv("AWS_SECRET_ACCESS_KEY"),
                    # region_name=getenv("REGION_NAME"))
#
#
# user_table = dynamodb.Table("user_info")
# project_table = dynamodb.Table("project_info")
#
# try:
    # user_response = user_table.scan(
        # AttributesToGet=["user_id", "tech_stack"]
    # )
    # proj_response = project_table.scan(
        # AttributesToGet=["project_id", "tech_stack"]
    # )
    # user_response['Items'].sort(key=lambda x:int(x["user_id"]))
    # proj_response['Items'].sort(key=lambda x:int(x["project_id"]))
#
    # global users
    # global projects
#
    # users = user_response['Items']
    # projects = proj_response['Items']
# except ClientError as e:
    # users, projects = None, None
#
# def user_recommand(uid):
    # user_jsim = dict()
    # for user in users:
        # user_jsim[user['user_id']] = {proj['user_id']:jacard_sim(user['tech_stack'], proj['tech_stack']) for proj in projects}
        # user_jsim[user['user_id']] = dict(sorted(user_jsim[user['user_id']].items(), key=lambda x:x[1], reverse=True))
    # return next(iter(user_jsim[uid]))
#
# def proj_recommend(pid):
    # proj_jsim = dict()
    # for proj in projects:
            # proj_jsim[proj['user_id']] = {user['user_id']:jacard_sim(proj['tech_stack'], user['tech_stack']) for user in users}
            # proj_jsim[proj['user_id']] = dict(sorted(proj_jsim[proj['user_id']].items(), key=lambda x:x[1], reverse=True))
    # return next(iter(proj_jsim[pid]))
#
# user_recommand('1')





