PACKAGE = vizzu-story
OS_TYPE = linux
PYTHON_BIN = python3
BIN_PATH = bin
ifeq ($(OS), Windows_NT)
	OS_TYPE = windows
	PYTHON_BIN = python
	BIN_PATH = Scripts
endif



.PHONY: clean \
	clean-dev-py update-dev-py-req install-dev-py-req check-dev-py \
	clean-dev-js check-dev-js \
	check format check-format lint check-lint check-typing \
	clean-doc doc \
	set-version restore-version

VIRTUAL_ENV = .venv_vizzu_story

DEV_PY_BUILD_FLAG = $(VIRTUAL_ENV)/DEV_PY_BUILD_FLAG
DEV_JS_BUILD_FLAG = node_modules/DEV_JS_BUILD_FLAG



clean: clean-dev-py clean-dev-js clean-doc



# init

clean-dev-py:
	$(PYTHON_BIN) -c "import os, shutil;shutil.rmtree('$(VIRTUAL_ENV)') if os.path.exists('$(VIRTUAL_ENV)') else print('Nothing to be done for \'clean-dev\'')"

clean-dev-js:
	$(PYTHON_BIN) -c "import os, shutil;shutil.rmtree('node_modules') if os.path.exists('node_modules') else print('Nothing to be done for \'clean-dev-js\'')"

update-dev-py-req: $(DEV_PY_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pip-compile --upgrade dev-requirements.in

install-dev-py-req: $(DEV_PY_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pip install --use-pep517 -r dev-requirements.txt

check-dev-py:
	$(PYTHON_BIN) tools/make/touch.py -f $(DEV_PY_BUILD_FLAG) --check

check-dev-js:
	$(PYTHON_BIN) tools/make/touch.py -f $(DEV_JS_BUILD_FLAG) --check

dev-py: $(DEV_PY_BUILD_FLAG)

dev-js: $(DEV_JS_BUILD_FLAG)

$(DEV_PY_BUILD_FLAG):
	$(PYTHON_BIN) -m venv $(VIRTUAL_ENV)
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) -m pip install --upgrade pip
	$(VIRTUAL_ENV)/$(BIN_PATH)/pip install --use-pep517 -r dev-requirements.txt
	$(PYTHON_BIN) tools/make/touch.py -f $(DEV_PY_BUILD_FLAG)

$(DEV_JS_BUILD_FLAG):
	npm install .
	$(PYTHON_BIN) tools/make/touch.py -f $(DEV_JS_BUILD_FLAG)



# ci

check: check-format check-lint check-typing

format: $(DEV_PY_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/black tools
	$(VIRTUAL_ENV)/$(BIN_PATH)/black -l 70 docs
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/mdformat/mdformat.py $(VIRTUAL_ENV)/$(BIN_PATH)/mdformat \
		--wrap 80 \
		--end-of-line keep \
		--line-length 70 \
		docs README.md CONTRIBUTING.md CODE_OF_CONDUCT.md
	npx prettier -w docs/ tools/

check-format: $(DEV_PY_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/black --check tools
	$(VIRTUAL_ENV)/$(BIN_PATH)/black --check -l 70 docs
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/mdformat/mdformat.py $(VIRTUAL_ENV)/$(BIN_PATH)/mdformat \
		--check \
		--wrap 80 \
		--end-of-line keep \
		--line-length 70 \
		docs README.md CONTRIBUTING.md CODE_OF_CONDUCT.md
	npx prettier -c docs/ tools/

lint: $(DEV_PY_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pylint tools
	npx eslint --ext .js,.cjs,.mjs -c .eslintrc.cjs --fix docs/

check-lint: $(DEV_PY_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pylint tools
	npx eslint --ext .js,.cjs,.mjs -c .eslintrc.cjs docs/

check-typing: $(DEV_PY_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/mypy tools



# doc

clean-doc:
ifeq ($(OS_TYPE), windows)
	if exist site ( rd /s /q site )
	for /d /r docs %%d in (.ipynb_checkpoints) do @if exist "%%d" rd /s /q "%%d"
else
	rm -rf site
	rm -rf `find docs -name '.ipynb_checkpoints'`
endif

doc: $(DEV_PY_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/mkdocs build -f ./tools/mkdocs/mkdocs.yml

deploy: $(DEV_PY_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	. $(VIRTUAL_ENV)/$(BIN_PATH)/activate; $(PYTHON_BIN) tools/release/deploy.py



# release

set-version: $(DEV_PY_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/release/set_version.py False

restore-version: $(DEV_PY_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/release/set_version.py True
