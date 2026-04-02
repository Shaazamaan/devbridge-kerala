@echo off
echo Resetting network stack...
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
echo Reset complete. Please restart your computer.
pause
