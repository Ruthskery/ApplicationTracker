from pydantic import BaseModel
from datetime import date
from typing import Optional

class JobCreate(BaseModel):
    position: str
    company: str
    address: str
    status: str
    date_applied: date
    salary: Optional[str] = None
    contact: Optional[str] = None
    notes: Optional[str] = None

class JobUpdate(BaseModel):
    position: Optional[str] = None
    company: Optional[str] = None
    address: Optional[str] = None
    status: Optional[str] = None
    date_applied: Optional[date] = None
    salary: Optional[str] = None
    contact: Optional[str] = None
    notes: Optional[str] = None

class JobResponse(BaseModel):
    id: int
    position: str
    company: str
    address: str
    status: str
    date_applied: date
    salary: Optional[str] = None
    contact: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        orm_mode = True
