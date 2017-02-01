#!/bin/bash
for i in {1..1}; do 
echo "Creating Google disk $i";
gcloud compute disks create pd-disk-$i --size 1GB --type=pd-ssd;
cat <<EOF | oc create -f -
---
apiVersion: "v1"
kind: "PersistentVolume"
metadata:
  name: "pv$i"
spec:
  capacity:
    storage: "1Gi"
  accessModes:
    - "ReadWriteOnce"
  persistentVolumeReclaimPolicy: Delete
  gcePersistentDisk:
    fsType: "ext4"
    pdName: "pd-disk-$i"
EOF
done