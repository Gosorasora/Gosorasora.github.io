import os

from diagrams import Cluster, Diagram, Edge
from diagrams.aws.compute import EC2, EC2AutoScaling
from diagrams.aws.database import Dynamodb, ElasticacheForRedis
from diagrams.aws.integration import SQS
from diagrams.aws.network import ElbApplicationLoadBalancer, Endpoint
from diagrams.aws.security import WAF
from diagrams.aws.storage import S3
from diagrams.gcp.storage import GCS
from diagrams.onprem.client import User
from diagrams.onprem.monitoring import Prometheus

from _render import (AWS_CLOUD, EDGE, GENERIC, GRAPH, NODE, OUT_DIR, PRIVATE_SUBNET,
                     PUBLIC_SUBNET, REGION, VPC, inline_icons)

name = os.path.join(OUT_DIR, "nanogrid")

with Diagram("", filename=name, outformat="svg", show=False, direction="LR",
             graph_attr=GRAPH, node_attr=NODE, edge_attr=EDGE):
    user = User("Client")

    with Cluster("AWS Cloud", graph_attr=AWS_CLOUD):
        with Cluster("Region", graph_attr=REGION):
            waf = WAF("AWS WAF")
            sqs = SQS("SQS\njob queue")
            s3 = S3("S3")
            ddb = Dynamodb("DynamoDB")

            with Cluster("VPC (2 AZ)", graph_attr=VPC):
                redis = ElasticacheForRedis("ElastiCache Redis")
                vpce = Endpoint("Gateway\nVPC Endpoint")
                with Cluster("Public subnet", graph_attr=PUBLIC_SUBNET):
                    alb = ElbApplicationLoadBalancer("ALB")
                    controller = EC2("Controller")
                with Cluster("Private subnet", graph_attr=PRIVATE_SUBNET):
                    worker = EC2AutoScaling("Worker\nwarm container\npools")
                    ai = EC2("Private AI node\nOllama,\nno public IP")

    prom = Prometheus("Prometheus")
    with Cluster("Google Cloud", graph_attr=GENERIC):
        gcs = GCS("Cloud Storage")

    user >> Edge(label="HTTPS") >> waf >> alb >> controller
    controller >> Edge(label="rate limit") >> redis
    controller >> Edge(label="enqueue") >> sqs
    sqs >> Edge(label="scales on\nSQS queue depth") >> worker
    worker >> ai
    worker >> vpce
    vpce >> s3
    vpce >> ddb
    worker >> Edge(label="metrics", style="dashed") >> prom
    s3 >> Edge(label="replication", style="dashed") >> gcs

inline_icons(name + ".svg")
