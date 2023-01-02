#!/bin/bash

SCRIPT=$(readlink -f "$0")
FULLDIR=$(dirname "$SCRIPT")

$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-hom" "keep-dev-portal-s3-web" "crossword" "$FULLDIR/.." "E3PJMXTTDOKWVI" "dist"
$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-hom" "keep-dev-portal-s3-web" "crossword-mini" "$FULLDIR/.." "E3PJMXTTDOKWVI" "dist"