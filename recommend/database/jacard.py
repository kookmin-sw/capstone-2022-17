def jacard_sim(user: set, proj: set):
    if user is None or proj is None:
        return 0
    else:
        return float(len(user.intersection(proj)) / len(user.union(proj)))

