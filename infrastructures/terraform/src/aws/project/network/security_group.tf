# ---------------------------------------------
# db_sg
# ---------------------------------------------
resource "aws_security_group" "db_sg" {
  name        = "db-sg"
  description = "database role security group"
  vpc_id      = aws_vpc.vpc.id

  tags = {
    Name = "db-sg"
  }
}

resource "aws_security_group_rule" "db_out_all" {
  security_group_id = aws_security_group.db_sg.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
}
