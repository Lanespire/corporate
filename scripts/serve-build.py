"""Serve ./build for local QA the way Netlify does: /cases/x resolves to cases/x.html."""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

root = Path(sys.argv[2] if len(sys.argv) > 2 else 'build').resolve()


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        target = Path(super().translate_path(path))
        pretty = target.with_name(target.name + '.html')
        if not target.exists() and not target.suffix and pretty.is_file():
            return str(pretty)
        return str(target)


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
ThreadingHTTPServer(('127.0.0.1', port), partial(Handler, directory=str(root))).serve_forever()
