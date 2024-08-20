# Hangman REST API server
This NestJS server manages word and player result data for the Hangman game. It uses Prisma ORM for MongoDB database connection and querying.
The server was deployed and can be accessed [here](https://hangman-server.adaptable.app/api).
# Endpoints
- GET `api/word/all`: Get all words and their information.
- POST `api/leaderboard`: Save a new player result.
- GET `api/leaderboard/top-1000`: Get the best 1000 of the player results by the following ordered criteria:
    1. Number of correct words (DESC)
    2. Total incorrect guesses (ASC)
    3. Time played (ASC)
- GET `api/leaderboard/search`: Search player results (even if they are not in the top 1000 list) by player name and date range.