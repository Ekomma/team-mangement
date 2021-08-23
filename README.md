# Team Mangement Backend Service



- POST ```/api/teams```
    Create a teams 
```
{
    "name": "Manchester United",
    "alias": "Red Devils",
    "managerDetails": {
        "fullname": "Ole",
        "age": 45,
        "nationality": "Norway"
    },
    "stadiumDetails": {
        "name": "Old Traford",
        "capacity": 75000,
        "address": "Manchester, England"
    },
    "teamDetails": {
        "totalNumberOfPlayers": 30,
        "captainName": "Harry Maguire",
        "viceCaptainName": "Paul Pogba"
    },
    "foundedDate": "1880-02-02"
}
```

- GET ```/api/teams```
    GET get the list of all

- POST ```api/players/register```
    Register a player to a football team
```
{
    "name": "Bruno Fernandes",
    "team": "Manchester United",
    "position": "midfield",
    "shirt": 13
}

```

- PUT ```api/players/deregister/:playerId```
    Register a player to a football team

- POST ```/api/schedules/create```
    Create a match schedule for a team
```
{
    "team": "Manchester City",
    "opponent": "Manchester United",
    "time": "23:56",
    "date": "2021-08-09",
    "status": "pending"
}
```
- PUT ```http://localhost:5000/api/schedules/update```
Update the result of a match to ```["win", "lose", "draw"]```
```
{
    "team": "Manchester City",
    "opponent": "Manchester United",
    "time": "23:56",
    "date": "2021-08-09",
    "status": "finished",
    "result": "draw"
}
```
- GET ```/api/players/team/:teamId``` get the list of all players in a team

- GET ```/api/schedules``` get the list of all match schedule

