#!/bin/bash

SCRIPT=$(readlink -f "$0")
FULLDIR=$(dirname "$SCRIPT")

$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-hom" "keep-hom-portal-s3-web" "crossword" "$FULLDIR/.." "EOH5DMH05PCUH" "dist"
$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-hom" "keep-hom-portal-s3-web" "crossword-mini" "$FULLDIR/.." "EOH5DMH05PCUH" "dist"