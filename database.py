import  datetime as dt

from sqlalchemy import Boolean, Column ,DateTime,Integer,String,create_engine
from sqlalchemy.orm import session, declarative_base,sessionmaker

DATABASE_URL ="sqlite:///./appointments_db.db"

engine =create_engine(DATABASE_URL, connect_args={"check_same_thread":False})
sessionLocal =sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base =declarative_base()

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String)
    company_name = Column(String)
    phone_number = Column(String)   
    service_required = Column(String)
    budget = Column(String)
    meeting_date = Column(String)
    meeting_time = Column(String)

def init_db() -> None:
    Base.metadata.create_all(bind= engine)    
init_db()    

