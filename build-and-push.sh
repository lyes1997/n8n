#!/bin/bash

# Build and Push n8n Docker Image to Private Registry
# Usage: ./build-and-push.sh <registry-url> [tag]

set -e

# Configuration
REGISTRY_URL=${1:-"your-registry.com"}
VERSION_TAG=${2:-"1.99.0-unlicensed"}
IMAGE_NAME="n8n-unlicensed"

echo "🏗️  Building n8n Docker images..."
echo "Registry: $REGISTRY_URL"
echo "Image: $IMAGE_NAME"
echo "Version: $VERSION_TAG"
echo ""

# Step 1: Build the base image
echo "📦 Building n8n base image..."
docker build -f docker/images/n8n-base/Dockerfile -t n8nio/base:22 .

# Step 2: Build the main n8n image
echo "🔨 Building main n8n image..."
docker build -f docker/images/n8n/Dockerfile -t $IMAGE_NAME:latest .
docker build -f docker/images/n8n/Dockerfile -t $IMAGE_NAME:$VERSION_TAG .

# Step 3: Tag for private registry
echo "🏷️  Tagging images for private registry..."
docker tag $IMAGE_NAME:latest $REGISTRY_URL/$IMAGE_NAME:latest
docker tag $IMAGE_NAME:$VERSION_TAG $REGISTRY_URL/$IMAGE_NAME:$VERSION_TAG

# Step 4: Push to registry
echo "📤 Pushing images to registry..."
docker push $REGISTRY_URL/$IMAGE_NAME:latest
docker push $REGISTRY_URL/$IMAGE_NAME:$VERSION_TAG

echo ""
echo "✅ Successfully built and pushed Docker images!"
echo "   Image: $REGISTRY_URL/$IMAGE_NAME:latest"
echo "   Image: $REGISTRY_URL/$IMAGE_NAME:$VERSION_TAG"
echo ""
echo "🚀 To use the image:"
echo "   docker run -d -p 5678:5678 $REGISTRY_URL/$IMAGE_NAME:latest"