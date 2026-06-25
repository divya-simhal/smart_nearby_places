from app.db.database import Base
from app.db.database import engine

from app.models.search import Search
from app.models.recommendation import Recommendation
from app.models.favorite import Favorite

Base.metadata.create_all(bind=engine)

print("All Tables Created")