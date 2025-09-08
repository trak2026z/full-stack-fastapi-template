#!/bin/bash
# Skrypt dodający 10 itemów do Full Stack FastAPI Template

#curl -X POST "http://localhost:8000/api/v1/login/access-token" -H "Content-Type: application/x-www-form-urlencoded" -d "username=trak@wp.pl" -d "password=Qwerty%%5"


# <<< Wklej tutaj swój access_token z /api/v1/login/access-token >>>
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTgwNTcxNzEsInN1YiI6ImEyZGU4MzBhLTM3YzEtNGY4Mi1iZWY0LWYzMzA4N2UyNDQzNyJ9.VLITMm-mdGk6AMbrpiLDQkt56R9xkU7ElTCbuusYwhE"
API="http://localhost:8000/api/v1"

for i in {1..10}; do
  echo "Dodaję item $i"
  curl -s -X POST "$API/items/" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"title\": \"Item $i\",
      \"description\": \"Opis dla itemu $i\"
    }"
  echo -e "\n---"
done

