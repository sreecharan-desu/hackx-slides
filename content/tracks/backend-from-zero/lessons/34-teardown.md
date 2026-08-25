---
title: "34. Turn it off"
order: 34
---

# Turn it off

Don't leave AWS up "just in case." You'll forget. **Elastic IPs** still bill when the instance is dead if you don't release them.

| | |
| --- | --- |
| 1 | Disassociate, then **release** the Elastic IP |
| 2 | Terminate the instance |
| 3 | Delete the key pair, trash the `.pem` |
| 4 | Delete the A record if you made one |
| 5 | Pause Neon |
| 6 | Billing → a $5 alarm |

```bash
aws ec2 describe-addresses --region ap-south-1
aws ec2 disassociate-address --association-id assoc-…
aws ec2 release-address --allocation-id eipalloc-…
aws ec2 terminate-instances --instance-ids i-… --region ap-south-1
```

Free tier ends. Idle IPs don't care.
