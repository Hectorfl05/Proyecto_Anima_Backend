from fastapi import APIRouter
from server.api.v1.routes import auth, analysis, recommend, history, user

router = APIRouter()

router.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
router.include_router(user.router, prefix="/api/v1/user", tags=["Profile"])
router.include_router(analysis.router, prefix="/api/v1/analysis", tags=["Analysis"])
router.include_router(history.router, prefix="/api/v1/history", tags=["History"])
router.include_router(recommend.router, prefix="/api/v1/recommend", tags=["Recommend"])
