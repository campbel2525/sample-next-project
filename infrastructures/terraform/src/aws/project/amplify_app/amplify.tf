module "user_front" {
  source = "../../modules/create_amplify"

  app_name              = "user-front"
  github_repository_url = var.github_repository_url
  github_token          = var.github_token
  github_branch_name    = var.github_branch_name
}
