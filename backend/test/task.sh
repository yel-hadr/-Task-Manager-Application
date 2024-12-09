#!/bin/bash

# Base URL of your API
BASE_URL="http://localhost:5000/api/tasks"

# Replace this with a valid JWT token
AUTH_TOKEN=""

# Test Data
NEW_TASK='{ "title": "New Task", "description": "Task details", "status": "Pending" }'
UPDATED_TASK='{ "title": "Updated Task Title", "status": "Completed" }'

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function print_success {
  echo -e "${GREEN}$1${NC}"
}

function print_error {
  echo -e "${RED}$1${NC}"
}

# Create a new task
echo "Creating a new task..."
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$NEW_TASK")
CREATE_BODY=$(echo "$CREATE_RESPONSE" | head -n 1)
CREATE_STATUS=$(echo "$CREATE_RESPONSE" | tail -n 1)

if [[ "$CREATE_STATUS" == "201" ]]; then
  print_success "Task created successfully: $CREATE_BODY"
  TASK_ID=$(echo "$CREATE_BODY" | jq -r '.id') # Extract the task ID using jq
else
  print_error "Failed to create task: $CREATE_BODY"
  exit 1
fi

# Get all tasks
echo "Fetching all tasks..."
GET_ALL_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET $BASE_URL \
  -H "Authorization: Bearer $AUTH_TOKEN")
GET_ALL_BODY=$(echo "$GET_ALL_RESPONSE" | head -n 1)
GET_ALL_STATUS=$(echo "$GET_ALL_RESPONSE" | tail -n 1)

if [[ "$GET_ALL_STATUS" == "200" ]]; then
  print_success "Fetched tasks: $GET_ALL_BODY"
else
  print_error "Failed to fetch tasks: $GET_ALL_BODY"
fi

# Get a specific task by ID
echo "Fetching task by ID..."
GET_BY_ID_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET $BASE_URL/$TASK_ID \
  -H "Authorization: Bearer $AUTH_TOKEN")
GET_BY_ID_BODY=$(echo "$GET_BY_ID_RESPONSE" | head -n 1)
GET_BY_ID_STATUS=$(echo "$GET_BY_ID_RESPONSE" | tail -n 1)

if [[ "$GET_BY_ID_STATUS" == "200" ]]; then
  print_success "Fetched task by ID: $GET_BY_ID_BODY"
else
  print_error "Failed to fetch task by ID: $GET_BY_ID_BODY"
fi

# Update the task
echo "Updating task..."
UPDATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT $BASE_URL/$TASK_ID \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$UPDATED_TASK")
UPDATE_BODY=$(echo "$UPDATE_RESPONSE" | head -n 1)
UPDATE_STATUS=$(echo "$UPDATE_RESPONSE" | tail -n 1)

if [[ "$UPDATE_STATUS" == "200" ]]; then
  print_success "Task updated successfully: $UPDATE_BODY"
else
  print_error "Failed to update task: $UPDATE_BODY"
fi

# Delete the task
echo "Deleting task..."
DELETE_RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE $BASE_URL/$TASK_ID \
  -H "Authorization: Bearer $AUTH_TOKEN")
DELETE_BODY=$(echo "$DELETE_RESPONSE" | head -n 1)
DELETE_STATUS=$(echo "$DELETE_RESPONSE" | tail -n 1)

if [[ "$DELETE_STATUS" == "200" ]]; then
  print_success "Task deleted successfully: $DELETE_BODY"
else
  print_error "Failed to delete task: $DELETE_BODY"
fi