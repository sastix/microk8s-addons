echo "You must set the K8S_USER env var. Eg. '-e K8S_USER=microadmin'"
echo "You must set the K8S_USER_PASS env var. Eg. '-e K8S_USER_PASS=<md5_value>'"
echo ""
echo "Example command to get the value: openssl passwd -apr1 <your_pass>"
DUMMY_PASS=$(openssl passwd -apr1 Qwerty)
echo "The md5 hash for word Qwerty is: $DUMMY_PASS"