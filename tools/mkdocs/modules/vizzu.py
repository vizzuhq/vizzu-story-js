"""A module for working with Vizzu."""

from pathlib import Path
import re


REPO_PATH = Path(__file__).parent / ".." / ".." / ".."
MKDOCS_PATH = REPO_PATH / "tools" / "mkdocs"

VIZZUSTORY_BACKEND_URL = ""

VIZZUSTORY_VERSION = ""
VIZZU_VERSION = ""

VIZZUSTORY_SITE_URL = "https://vizzu-story.vizzuhq.com"
VIZZUSTORY_CDN_URL = "https://cdn.jsdelivr.net/npm/vizzu-story"
VIZZU_SITE_URL = "https://lib.vizzuhq.com"
VIZZU_CDN_URL = "https://cdn.jsdelivr.net/npm/vizzu"


class Vizzu:
    """A class for working with Vizzu."""

    @staticmethod
    def get_vizzustory_backend_url() -> str:
        """
        A static method for returning backend vizzu-story url.
        Returns:
            Backend vizzu-story url.
        """

        if VIZZUSTORY_BACKEND_URL:
            return VIZZUSTORY_BACKEND_URL
        version = Vizzu.get_vizzustory_version()
        return f"{VIZZUSTORY_CDN_URL}@{version}/dist/vizzu-story.min.js"

    @staticmethod
    def set_vizzustory_backend_url(content: str, restore: bool = False) -> str:
        """
        A static method for setting vizzu-story backend url in content.

        Args:
            content: Content to be modified.
            restore: A flag to restore the content.

        Returns:
            Modified content.
        """

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
        """
        A static method for returning vizzu-story major.minor.patch version.
        Returns:
            vizzu-story major.minor.patch version.
        """

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
        """
        A static method for returning vizzu-story major.minor version.

        Returns:
            vizzu-story major.minor version.
        """

        if VIZZUSTORY_VERSION:
            return VIZZUSTORY_VERSION
        version_parts = Vizzu.get_vizzustory_full_version()
        return f"{version_parts[0]}.{version_parts[1]}"

    @staticmethod
    def get_vizzu_version() -> str:
        """
        A static method for returning vizzu major.minor version.

        Returns:
            vizzu major.minor version.
        """

        if VIZZU_VERSION:
            return VIZZU_VERSION
        with open(
            REPO_PATH / "package.json",
            "r",
            encoding="utf8",
        ) as f_version:
            content = f_version.read()
            version = re.search(r"\"vizzu\":\s\"~(\d+).(\d+).(\d+)\"", content)
            return f"{version.group(1)}.{version.group(2)}"  # type: ignore

    @staticmethod
    def set_version(content: str, restore: bool = False) -> str:
        """
        A static method for setting vizzu version in content.

        Args:
            content: Content to be modified.
            restore: A flag to restore the content.

        Returns:
            Modified content.
        """

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
