# ---------------------------------------------
# VPC
# ---------------------------------------------
resource "aws_vpc" "vpc" {
  cidr_block                       = "10.0.0.0/16"
  instance_tenancy                 = "default"
  enable_dns_support               = true
  enable_dns_hostnames             = true
  assign_generated_ipv6_cidr_block = false

  tags = {
    Name = "vpc"
  }
}

# ---------------------------------------------
# Subnet
# ---------------------------------------------
resource "aws_subnet" "private_subnet_1a" {
  vpc_id                  = aws_vpc.vpc.id
  availability_zone       = "ap-northeast-1a"
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = false

  tags = {
    Name = "private-subnet-1a"
    Type = "private"
  }
}

resource "aws_subnet" "private_subnet_1c" {
  vpc_id                  = aws_vpc.vpc.id
  availability_zone       = "ap-northeast-1c"
  cidr_block              = "10.0.5.0/24"
  map_public_ip_on_launch = false

  tags = {
    Name = "private-subnet-1c"
    Type = "private"
  }
}

# ---------------------------------------------
# Route Table
# ---------------------------------------------
resource "aws_route_table" "private_rtb" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "private-rtb"
    Type = "private"
  }
}

# ---------------------------------------------
# Route Table Association
# ルートテーブルとサブネットの紐付け(明示的なサブネットの関連付け)
# ---------------------------------------------
resource "aws_route_table_association" "private_rtb_to_private_subnet_1a" {
  route_table_id = aws_route_table.private_rtb.id
  subnet_id      = aws_subnet.private_subnet_1a.id
}

resource "aws_route_table_association" "private_rtb_to_private_subnet_1c" {
  route_table_id = aws_route_table.private_rtb.id
  subnet_id      = aws_subnet.private_subnet_1c.id
}
