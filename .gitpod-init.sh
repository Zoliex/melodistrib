#!/bin/bash

# Allow connections to X server
xhost +

# Set DISPLAY variable
export DISPLAY=:1

# Start X11 server
Xvfb $DISPLAY -screen 0 1920x1080x24 &

# Wait for X11 server to start
sleep 5

# Execute the provided command
exec "$@"
