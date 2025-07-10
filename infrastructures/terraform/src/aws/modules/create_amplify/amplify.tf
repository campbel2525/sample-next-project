resource "aws_amplify_app" "amplify" {
  name                        = var.app_name
  repository                  = var.github_repository_url
  oauth_token                 = var.github_token
  platform                    = "WEB_COMPUTE"
  enable_branch_auto_build    = true
  enable_branch_auto_deletion = true
  enable_basic_auth           = false
  enable_auto_branch_creation = false
  iam_service_role_arn        = aws_iam_role.role.arn
}

resource "aws_amplify_branch" "user_front_main" {
  app_id                      = aws_amplify_app.amplify.id
  branch_name                 = var.github_branch_name
  framework                   = "Next.js - SSR"
  stage                       = "PRODUCTION"
  enable_auto_build           = true
  enable_pull_request_preview = false
}
