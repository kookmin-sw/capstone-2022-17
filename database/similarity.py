from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def jacard_sim(user: set, proj: set):
    if user is None or proj is None:
        return 0
    else:
        return float(len(user.intersection(proj)) / len(user.union(proj)))

def cosine_sim(user : list, proj : list):
    if user is None or proj is None:
        return 0
    user = ", ".join(user)
    proj = ", ".join(proj)
    tests = (user, proj)
    tfidf_vectorizer = TfidfVectorizer()
    tests_matrix = tfidf_vectorizer.fit_transform(tests) # 문장 벡터화 진행

    return cosine_similarity(tests_matrix[0], tests_matrix[1]).reshape(-1)[0].astype(float) # 첫 번째와 두 번째 문장 비교




