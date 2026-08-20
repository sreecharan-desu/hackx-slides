---
title: "31. Teach order (say this out loud)"
order: 31
---

# Teach order (say this out loud)

Optimal live flow (~25 min):

```text
1. Restaurant metaphor          (1 min)
2. Architecture diagram         (2 min)
3. npm init + Express health    (3 min)  ← run it
4. Postgres + db-check          (3 min)  ← run it
5. Register + hash              (3 min)  ← curl
6. MailDev locally              (1 min)
7. Amazon SES setup             (3 min)  ← show console + .env
8. Verify + Login + /me         (4 min)  ← curl
9. Forgot password via SES      (2 min)  ← real inbox
10. Chat stub + auth wall       (2 min)
11. GitHub Actions → EC2        (3 min)
12. Domain + HTTPS              (2 min)
13. AWS pitch mapping           (2 min)
```

### Rule

```text
Explain concept → paste code → run command → show result
```

Do **not** read every line. Point at the important 3 lines.

### Commands cheat sheet

```bash
npm run dev
curl localhost:4000/health
curl localhost:4000/me -H "Authorization: Bearer $TOKEN"
ssh -i key.pem ubuntu@IP
pm2 status
sudo nginx -t
sudo certbot --nginx -d api.yourdomain.com
```
