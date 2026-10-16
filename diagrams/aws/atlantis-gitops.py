import os

from diagrams import Cluster, Diagram, Edge
from diagrams.aws.general import General
from diagrams.aws.security import IAMRole
from diagrams.aws.storage import S3
from diagrams.onprem.client import User, Users
from diagrams.onprem.iac import Atlantis, Terraform
from diagrams.onprem.vcs import Github

from _render import AWS_CLOUD, EDGE, GENERIC, GRAPH, NODE, OUT_DIR, inline_icons

name = os.path.join(OUT_DIR, "atlantis-gitops")

with Diagram("", filename=name, outformat="svg", show=False, direction="LR",
             graph_attr=GRAPH, node_attr=NODE, edge_attr=EDGE):
    dev = User("Developer")
    pr = Github("Pull Request")
    approvers = Users("Approvers\n2+ reviewers")
    local = Terraform("Local terraform apply\nAccess Keys\nrevoked (0)")

    with Cluster("Kubernetes cluster", graph_attr=GENERIC):
        atlantis = Atlantis("Atlantis\nHelm on existing K8s")

    with Cluster("AWS Cloud", graph_attr=AWS_CLOUD):
        role = IAMRole("IAM Role\nshort-lived creds")
        resources = General("AWS resources")
        state = S3("Terraform state\nbucket policy:\nexplicit deny")

    dev >> pr
    approvers >> Edge(label="approve") >> pr
    pr >> Edge(label="plan_requirements: mergeable\nfix PR #6186") >> atlantis
    atlantis >> Edge(label="AssumeRole") >> role
    role >> Edge(label="apply") >> resources
    role >> state
    local >> Edge(label="denied", color="#D13212", fontcolor="#D13212", style="dashed") >> state

inline_icons(name + ".svg")
