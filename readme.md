# 注意点

- ものレポ
- apps
  - migration
  - user-front
- prisma は apps/migration で管理
- apps/user-front/prisma と apps/migration/prisma がマウントされている
  - prisma を変える場合は migration の方を変える
