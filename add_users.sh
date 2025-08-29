#!/bin/bash
# Skrypt dodający 10 użytkowników do Full Stack FastAPI Template

# <<< Wklej tutaj swój access_token z /api/v1/login/access-token >>>
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTcxNTM0NzgsInN1YiI6IjBmNTBkOWUyLWMyZGQtNDM3My05YjhhLWQ0YTVhMDg0ZThhMiJ9.poZDwlEuwdBuQWkUPLaeQh6HMmN1OPRvSG4sZFe497E"

API="http://localhost:8000/api/v1"

for i in {1..10}; do
  echo "Dodaję użytkownika user$i@example.com"
  curl -s -X POST "$API/users/" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"email\": \"user$i@example.com\",
      \"password\": \"Password${i}!\",
      \"full_name\": \"User $i\"
    }"
  echo -e "\n---"
done

