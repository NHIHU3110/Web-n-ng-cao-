#!/bin/bash
echo "Cleaning up ports 3002 and 3003..."
kill -9 $(lsof -t -i:3002) 2>/dev/null
kill -9 $(lsof -t -i:3003) 2>/dev/null
echo "Done. You can now run npm start."
