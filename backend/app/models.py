from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    position = Column(String(255), nullable=False)
    company = Column(String(1024), nullable=False)
    address = Column(String(1024), nullable=False)
    status = Column(String(255), nullable=False)
    date_applied = Column(Date, nullable=False)
    salary = Column(String(1024), nullable=True)
    contact = Column(String(1024), nullable=True)
    notes = Column(String(2048), nullable=True)