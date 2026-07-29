#!/bin/bash
# public/resume*.html -> public/assets/resume*.pdf (headless Chrome)
set -e
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
cd "$(dirname "$0")"
for f in public/resume.html public/resume_kr.html public/resume_en.html public/resume_jp.html; do
  out="public/assets/$(basename "$f" .html).pdf"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$out" "file://$PWD/$f" 2>/dev/null
  echo "built $out"
done
