# version.sh
# This bash script is used to ensure airwallex-payment-elements 
# packages are up to date for each demo.  This is not required
# for integration.

DEMOS=(react react-ts vue angular)
ERROR=0
for i in ${DEMOS[@]}
do
  echo "integrations/$i"
  OUTDATED_PACKAGES=$(cd integrations/$i && yarn outdated)
  APE='airwallex-payment-elements'
  if [[ "$OUTDATED_PACKAGES" == *"$APE"* ]]; then
    echo "error Package airwallex-payment-elements is not updated to its latest version in $i demo."
    let "ERROR+=1"
  fi
done
if [[ ERROR -gt 0 ]] 
then
  echo "ERROR: Some airwallex-payment-elements packages are not updated to its latest version.  Please update them and try again."
  exit 1
else
  exit 0
fi