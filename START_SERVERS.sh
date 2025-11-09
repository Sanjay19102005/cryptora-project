#!/bin/bash

echo "Starting CRYPTORA Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting CRYPTORA Frontend Server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

