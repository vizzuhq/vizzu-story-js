# pylint: disable=missing-module-docstring,missing-class-docstring,missing-function-docstring

from pathlib import Path
import sys
import re

import mkdocs_gen_files  # type: ignore


REPO_PATH = Path(__file__).parent / ".." / ".." / ".."
TOOLS_PATH = REPO_PATH / "tools"
MKDOCS_PATH = TOOLS_PATH / "docs"
JS_ASSETS_PATH = "assets/javascripts"

sys.path.insert(0, str(TOOLS_PATH / "modules"))


from chdir import (  # pylint: disable=import-error, wrong-import-position, wrong-import-order
    chdir,
)
from vizzu import (  # pylint: disable=import-error, wrong-import-position, wrong-import-order
    Vizzu,
    VIZZUSTORY_SITE_URL,
)


class GenExamples:
    # pylint: disable=too-few-public-methods

    @staticmethod
    def _create_index() -> None:
        with mkdocs_gen_files.open("examples/index.md", "a") as fh_index:
            meta = """---\nhide:\n  - toc\n---"""
            fh_index.write(f"{meta}\n\n")
            fh_index.write("# Examples\n")
            fh_index.write(f'<script src="../{JS_ASSETS_PATH}/thumbs.js"></script>\n')

    @staticmethod
    def _add_image(example: Path) -> None:
        with mkdocs_gen_files.open("examples/index.md", "a") as fh_index:
            fh_index.write(
                "["
                + f"![{example.stem}]"
                + f"(./{example.stem}.png)"
                + "{ class='image-gallery' }"
                + "]"
                + f"(./{example.name})\n"
            )

    @staticmethod
    def _remove_eslint_comments(content: str) -> str:
        regex = r"^\s*//\s*eslint.*?\n"
        return re.sub(regex, "", content, flags=re.MULTILINE)

    @staticmethod
    def _set_csv2js_url(content: str) -> str:
        return content.replace(
            "../../assets/javascripts/csv2js.js",
            f"{VIZZUSTORY_SITE_URL}/latest/assets/javascripts/csv2js.js",
        )

    @staticmethod
    def _set_csv_url(example: Path, content: str) -> str:
        return content.replace(
            'Csv2Js.csv("./',
            f'Csv2Js.csv("{VIZZUSTORY_SITE_URL}/latest/examples/{example.stem}/',
        )

    @staticmethod
    def _get_js(example: Path) -> str:
        with open(
            example.parent / example.stem / "main.js", "r", encoding="utf8"
        ) as fh_js:
            return fh_js.read()

    @staticmethod
    def _generate_example_js(example: Path, js_content: str) -> None:
        content = Vizzu.set_vizzustory_backend_url(js_content)
        with mkdocs_gen_files.open(f"examples/{example.stem}/main.js", "w") as fh_js:
            fh_js.write(content)

    @staticmethod
    def _generate_example_md(example: Path, js_content: str) -> None:
        regex = r"// {% include \"(\.\/.*\.js)\" %}"
        with open(example.parent / example.name, "r", encoding="utf8") as fh_md:
            content = fh_md.read()
            content = re.sub(regex, js_content, content)
            content = GenExamples._remove_eslint_comments(content)
            content = GenExamples._set_csv2js_url(content)
            content = GenExamples._set_csv_url(example, content)
            content = Vizzu.set_version(content)
        mkdocs_gen_files.set_edit_path(
            f"examples/{example.name}", f"examples/{example.name}"
        )
        with mkdocs_gen_files.open(f"examples/{example.name}", "w") as fh_md:
            fh_md.write(content)

    @staticmethod
    def _generate_example(example: Path) -> None:
        js_content = GenExamples._get_js(example)
        GenExamples._generate_example_js(example, js_content)
        GenExamples._generate_example_md(example, js_content)
        GenExamples._add_image(example)

    @staticmethod
    def generate() -> None:
        GenExamples._create_index()
        example_path = REPO_PATH / "docs" / "examples"
        for example in sorted(example_path.glob("*.md")):
            GenExamples._generate_example(example)


def main() -> None:
    with chdir(REPO_PATH):
        GenExamples.generate()


main()
