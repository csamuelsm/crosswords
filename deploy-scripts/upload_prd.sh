#!/bin/bash

SCRIPT=$(readlink -f "$0")
FULLDIR=$(dirname "$SCRIPT")

$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-prd" "keep-prd-portal-s3-web" "crossword" "$FULLDIR/.." "EXF9M5ZEWX8MD" "dist"
$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-prd" "keep-prd-portal-s3-web" "crossword-mini" "$FULLDIR/.." "EXF9M5ZEWX8MD" "dist"