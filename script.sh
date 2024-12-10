#!/bin/bash

# Define the directory structure
declare -A directories=(
    ["src/components/auth"]="Login.jsx Register.jsx"
    ["src/components/tasks"]="TaskList.jsx TaskItem.jsx TaskModal.jsx"
    ["src/components/common"]="Header.jsx PrivateRoute.jsx"
    ["src/pages"]="Dashboard.jsx AuthPage.jsx TasksPage.jsx"
    ["src/services"]="authService.js taskService.js"
    ["src/store"]="authSlice.js taskSlice.js"
    ["src/utils"]="axiosConfig.js"
)

# Create directories and files
echo "Creating frontend directory structure..."
mkdir -p frontend
cd frontend || exit

# Create root-level files
touch index.html package.json tsconfig.json

# Create subdirectories and files
for dir in "${!directories[@]}"; do
    mkdir -p "$dir"
    for file in ${directories[$dir]}; do
        touch "$dir/$file"
    done
done

# Create remaining files
touch src/App.jsx src/main.jsx

echo "Frontend directory structure created successfully!"