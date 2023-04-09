"""A module for generating examples."""

from pathlib import Path
import sys

import mkdocs_gen_files  # type: ignore


REPO_PATH = Path(__file__).parent / ".." / ".." / ".."
MKDOCS_PATH = REPO_PATH / "tools" / "mkdocs"
JS_ASSETS_PATH = "assets/javascripts"

sys.path.insert(0, str(MKDOCS_PATH / "modules"))

from context import (  # pylint: disable=import-error, wrong-import-position, wrong-import-order
    chdir,
)


class ExampleIndex:
    """A class for generating notebooks."""

    # pylint: disable=too-few-public-methods

    @staticmethod
    def generate() -> None:
        """A method for generating shareable notebooks."""

        example_path = REPO_PATH / "docs" / "examples"
        with mkdocs_gen_files.open("examples/index.md", "a") as f_index:
            meta = """---\nhide:\n  - toc\n---"""
            f_index.write(f"{meta}\n\n")
            f_index.write("# Examples\n")
            f_index.write(f'<script src="../{JS_ASSETS_PATH}/thumbs.js"></script>\n')
            for path in sorted(example_path.glob("*.md")):
                f_index.write(
                    "["
                    + f"![{path.stem}]"
                    + f"(./{path.stem}.png)"
                    + "{ class='image-gallery' }"
                    + "]"
                    + f"(./{path.name})\n"
                )


def main() -> None:
    """
    The main method.
    It prepares files for the documentation site.
    """

    with chdir(REPO_PATH):
        ExampleIndex.generate()


main()
