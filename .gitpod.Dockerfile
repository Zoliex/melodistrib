FROM gitpod/workspace-full

# Install necessary dependencies
RUN sudo apt-get update && sudo apt-get install -y \
    xserver-xorg \
    x11-apps \
    xfce4

# Start Xfce desktop environment
CMD ["startxfce4"]
