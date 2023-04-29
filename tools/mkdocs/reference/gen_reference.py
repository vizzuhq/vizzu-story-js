"""A module for generating the code reference."""

import os
from pathlib import Path
import shutil
import sys

import mkdocs_gen_files


REPO_PATH = Path(__file__).parent / ".." / ".." / ".."
MKDOCS_PATH = REPO_PATH / "tools" / "mkdocs"
GEN_PATH = MKDOCS_PATH / "reference"
SRC_PATH = REPO_PATH / "src"


sys.path.insert(0, str(MKDOCS_PATH))

from context import (  # pylint: disable=import-error, wrong-import-position, wrong-import-order
    chdir,
)
from node import (  # pylint: disable=import-error, wrong-import-position, wrong-import-order
    Node,
)
from md import (  # pylint: disable=import-error, wrong-import-position, wrong-import-order
    Md,
)


class Reference:
    """A class for generating the code reference."""

    # pylint: disable=too-few-public-methods

    @staticmethod
    def generate(folder: str) -> None:
        """
        A method for generating the code reference.

        Args:
            folder: The destination folder of the code reference.
        """

        Reference._gen_reference(folder)

    @staticmethod
    def _gen_reference(folder: str) -> None:
        tmp_dir = GEN_PATH / "tmp"
        if os.path.exists(tmp_dir):
            shutil.rmtree(tmp_dir)

        Node.node(False, GEN_PATH / "gen_reference.cjs")

        for path in Path(tmp_dir).rglob("*.md"):
            with open(path, "rt", encoding="utf8") as f_src:
                content = f_src.read()
                content = content.replace("##### ", "").replace("#### ", "")
                # content = Vizzu.set_version(content)
                content = Md.format(content)
                with mkdocs_gen_files.open(
                    f"{folder}/{path.relative_to(tmp_dir)}", "w"
                ) as f_dst:
                    f_dst.write(content)


def main() -> None:
    """
    The main method.
    It generates the code reference.
    """

    with chdir(REPO_PATH):
        Reference.generate("reference")


main()
