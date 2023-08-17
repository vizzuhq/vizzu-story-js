# pylint: disable=missing-module-docstring,missing-class-docstring,missing-function-docstring

from pathlib import Path
import re


REPO_PATH = Path(__file__).parent / ".." / ".."

VIZZUSTORY_BACKEND_URL = ""

VIZZUSTORY_VERSION = ""
VIZZU_VERSION = ""

VIZZUSTORY_SITE_URL = "https://vizzu-story.vizzuhq.com"
VIZZUSTORY_CDN_URL = "https://cdn.jsdelivr.net/npm/vizzu-story"
VIZZU_SITE_URL = "https://lib.vizzuhq.com"
VIZZU_CDN_URL = "https://cdn.jsdelivr.net/npm/vizzu"


class Vizzu:
    _vizzustory_version = ""
    _vizzu_version = ""

    @staticmethod
    def get_vizzustory_backend_url() -> str:
        if VIZZUSTORY_BACKEND_URL:
            return VIZZUSTORY_BACKEND_URL
        version = Vizzu.get_vizzustory_version()
        return f"{VIZZUSTORY_CDN_URL}@{version}/dist/vizzu-story.min.js"

    @staticmethod
    def set_vizzustory_backend_url(content: str, restore: bool = False) -> str:
        url = Vizzu.get_vizzustory_backend_url()
        if not restore:
            content = content.replace(
                f"{VIZZUSTORY_CDN_URL}@latest/dist/vizzu-story.min.js",
                url,
            )
        else:
            content = content.replace(
                url,
                f"{VIZZUSTORY_CDN_URL}@latest/dist/vizzu-story.min.js",
            )
        return content

    @staticmethod
    def get_vizzustory_full_version() -> list:
        with open(
            REPO_PATH / "package.json",
            "r",
            encoding="utf8",
        ) as f_version:
            content = f_version.read()
            version = re.search(r"\"version\":\s\"(\d+).(\d+).(\d+)\"", content)
            return [
                version.group(1),  # type: ignore
                version.group(2),  # type: ignore
                version.group(3),  # type: ignore
            ]

    @staticmethod
    def get_vizzustory_version() -> str:
        if VIZZUSTORY_VERSION:
            return VIZZUSTORY_VERSION
        if not Vizzu._vizzustory_version:
            version_parts = Vizzu.get_vizzustory_full_version()
            Vizzu._vizzustory_version = f"{version_parts[0]}.{version_parts[1]}"
        return Vizzu._vizzustory_version

    @staticmethod
    def get_vizzu_version() -> str:
        if VIZZU_VERSION:
            return VIZZU_VERSION
        if not Vizzu._vizzu_version:
            with open(
                REPO_PATH / "package.json",
                "r",
                encoding="utf8",
            ) as f_version:
                content = f_version.read()
                version = re.search(r"\"vizzu\":\s\"~(\d+).(\d+).(\d+)\"", content)
                Vizzu._vizzu_version = f"{version.group(1)}.{version.group(2)}"  # type: ignore
        return Vizzu._vizzu_version

    @staticmethod
    def set_version(content: str, restore: bool = False) -> str:
        vizzu_version = Vizzu.get_vizzu_version()
        vizzustory_version = Vizzu.get_vizzustory_version()
        if not restore:
            content = content.replace(
                f"{VIZZUSTORY_SITE_URL}/latest/",
                f"{VIZZUSTORY_SITE_URL}/{vizzustory_version}/",
            )
            content = content.replace(
                f"{VIZZU_SITE_URL}/latest/",
                f"{VIZZU_SITE_URL}/{vizzu_version}/",
            )
            content = content.replace(
                f"{VIZZUSTORY_CDN_URL}@latest/dist/vizzu-story.min.js",
                f"{VIZZUSTORY_CDN_URL}@{vizzustory_version}/dist/vizzu-story.min.js",
            )
            content = content.replace(
                f"{VIZZU_CDN_URL}@latest/dist/vizzu.min.js",
                f"{VIZZU_CDN_URL}@{vizzu_version}/dist/vizzu.min.js",
            )
        else:
            content = content.replace(
                f"{VIZZUSTORY_SITE_URL}/{vizzustory_version}/",
                f"{VIZZUSTORY_SITE_URL}/latest/",
            )
            content = content.replace(
                f"{VIZZU_SITE_URL}/{vizzu_version}/",
                f"{VIZZU_SITE_URL}/latest/",
            )
            content = content.replace(
                f"{VIZZUSTORY_CDN_URL}@{vizzustory_version}/dist/vizzu-story.min.js",
                f"{VIZZUSTORY_CDN_URL}@latest/dist/vizzu-story.min.js",
            )
            content = content.replace(
                f"{VIZZU_CDN_URL}@{vizzu_version}/dist/vizzu.min.js",
                f"{VIZZU_CDN_URL}@latest/dist/vizzu.min.js",
            )

        return content
