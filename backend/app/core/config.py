from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Centralized app configuration.
    All values load from environment variables / .env file -
    nothing sensitive is hardcoded anywhere else in the codebase.
    """

    GEOAPIFY_API_KEY: str
    DATABASE_URL: str
    REDIS_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
