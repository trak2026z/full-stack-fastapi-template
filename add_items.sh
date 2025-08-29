#!/bin/bash
# Skrypt dodający 10 itemów do Full Stack FastAPI Template

# <<< Wklej tutaj swój access_token z /api/v1/login/access-token >>>
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTcxNTM0NzgsInN1YiI6IjBmNTBkOWUyLWMyZGQtNDM3My05YjhhLWQ0YTVhMDg0ZThhMiJ9.poZDwlEuwdBuQWkUPLaeQh6HMmN1OPRvSG4sZFe497E"

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

