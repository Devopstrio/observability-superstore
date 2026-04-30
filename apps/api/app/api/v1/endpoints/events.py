from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_events():
    return {'status': 'ok', 'component': 'events'}
