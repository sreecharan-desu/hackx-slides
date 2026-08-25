---
title: "34. Turn it off"
order: 34
---

# Turn it off

Don't leave AWS up "just in case." You'll forget. **Elastic IPs** still bill after the instance is gone if you don't release them.

**Do not paste `assoc-…` or `i-…`.** Those dots are "put your real id here." Copy IDs from the describe output.

```bash
# 1. Elastic IP? empty list = you never allocated one. skip to instances.
aws ec2 describe-addresses --region ap-south-1
```

If you see `AssociationId` and `AllocationId`, then:

```bash
aws ec2 disassociate-address --association-id assoc-0YOURREALID
aws ec2 release-address --allocation-id eipalloc-0YOURREALID
```

```bash
# 2. Find the box, then terminate THAT id
aws ec2 describe-instances --region ap-south-1 \
  --query 'Reservations[].Instances[].{Id:InstanceId,State:State.Name,Ip:PublicIpAddress}' \
  --output table

aws ec2 terminate-instances --instance-ids i-0YOURREALID --region ap-south-1
```

Then: delete the key pair, trash the `.pem`, delete the DNS A record if you made one, pause Neon, set a $5 billing alarm.

`Addresses: []` means no Elastic IP to release. `terminated` in the table means the instance is already off.
