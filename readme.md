気をつけて欲しいのが、このプロジェクトはモノレポとなっていて複数のプロジェクトがここに入っています
apps 配下に下記のプロジェクトが入っています

- migration
- user-front

特に注意して欲しいのが
prisma の管理は

- migration

でしていて、ユーザーのアプリケーションは

- user-front

でしています
docker の設定で
`apps/migration/prisma`と`apps/user-front/prima`をリンクしています

そのため
