#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Workspace entrypoint for the SEO audit crawler.

The maintained crawler lives in the installed SEO audit plugin. This thin
adapter keeps the audit workflow's expected ``assets/seo_crawler.py`` path
available without duplicating the crawler implementation.
"""
from __future__ import annotations

import os
import runpy
import sys
from pathlib import Path


PLUGIN_ROOT_ENV = "PHOENIX_PLUGIN_ROOT_SEO_FULL_AUDIT_TOOLKIT"


def resolve_crawler() -> Path:
    plugin_root = os.environ.get(PLUGIN_ROOT_ENV)
    if not plugin_root:
        raise RuntimeError(
            f"{PLUGIN_ROOT_ENV} is not set; install or enable the SEO audit plugin first."
        )

    crawler = (
        Path(plugin_root)
        / "skills"
        / "seo-full-audit"
        / "assets"
        / "seo_crawler.py"
    )
    if not crawler.is_file():
        raise FileNotFoundError(f"Installed SEO crawler not found: {crawler}")
    return crawler


if __name__ == "__main__":
    try:
        runpy.run_path(str(resolve_crawler()), run_name="__main__")
    except (FileNotFoundError, RuntimeError) as error:
        print(f"SEO crawler startup failed: {error}", file=sys.stderr)
        raise SystemExit(2) from error
