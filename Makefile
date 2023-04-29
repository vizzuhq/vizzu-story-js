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
	clean-dev update-dev-req install-dev-req touch-dev \
	clean-dev-js touch-dev-js \
	check format check-format lint check-lint check-typing \
	clean-doc doc

VIRTUAL_ENV = .venv_vizzu_story

DEV_BUILD_FLAG = $(VIRTUAL_ENV)/DEV_BUILD_FLAG
DEV_JS_BUILD_FLAG = $(VIRTUAL_ENV)/DEV_JS_BUILD_FLAG



clean: clean-dev clean-dev-js clean-doc



# init

clean-dev:
	$(PYTHON_BIN) -c "import os, shutil;shutil.rmtree('$(VIRTUAL_ENV)') if os.path.exists('$(VIRTUAL_ENV)') else print('Nothing to be done for \'clean-dev\'')"

clean-dev-js:
	$(PYTHON_BIN) -c "import os, shutil;shutil.rmtree('node_modules') if os.path.exists('node_modules') else print('Nothing to be done for \'clean-dev-js\'')"

update-dev-req: $(DEV_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pip-compile --upgrade dev-requirements.in

install-dev-req:
	$(VIRTUAL_ENV)/$(BIN_PATH)/pip install --use-pep517 -r dev-requirements.txt

touch-dev:
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/make/touch.py -f $(DEV_BUILD_FLAG)

touch-dev-js:
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/make/touch.py -f $(DEV_JS_BUILD_FLAG)

dev: $(DEV_BUILD_FLAG)

dev-js: $(DEV_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)

$(DEV_BUILD_FLAG):
	$(PYTHON_BIN) -m venv $(VIRTUAL_ENV)
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) -m pip install --upgrade pip
	$(MAKE) -f Makefile install-dev-req
	$(MAKE) -f Makefile touch-dev

$(DEV_JS_BUILD_FLAG):
	npm install .
	$(MAKE) -f Makefile touch-dev-js



# ci

check: check-format check-lint check-typing

format: $(DEV_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/black tools
	$(VIRTUAL_ENV)/$(BIN_PATH)/black -l 70 docs
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/mdformat/mdformat.py $(VIRTUAL_ENV)/$(BIN_PATH)/mdformat \
		--wrap 80 \
		--end-of-line keep \
		--line-length 70 \
		docs README.md CONTRIBUTING.md CODE_OF_CONDUCT.md
	npx prettier -w docs/ tools/

check-format: $(DEV_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/black --check tools
	$(VIRTUAL_ENV)/$(BIN_PATH)/black --check -l 70 docs
	$(VIRTUAL_ENV)/$(BIN_PATH)/$(PYTHON_BIN) tools/mdformat/mdformat.py $(VIRTUAL_ENV)/$(BIN_PATH)/mdformat \
		--check \
		--wrap 80 \
		--end-of-line keep \
		--line-length 70 \
		docs README.md CONTRIBUTING.md CODE_OF_CONDUCT.md
	npx prettier -c docs/ tools/

lint: $(DEV_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pylint tools
	npx eslint --ext .js,.cjs,.mjs -c .eslintrc.cjs --fix docs/

check-lint: $(DEV_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/pylint tools
	npx eslint --ext .js,.cjs,.mjs -c .eslintrc.cjs docs/

check-typing: $(DEV_BUILD_FLAG)
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

doc: $(DEV_BUILD_FLAG)
	$(VIRTUAL_ENV)/$(BIN_PATH)/mkdocs build -f ./tools/mkdocs/mkdocs.yml

deploy: $(DEV_BUILD_FLAG) $(DEV_JS_BUILD_FLAG)
	. $(VIRTUAL_ENV)/$(BIN_PATH)/activate; $(PYTHON_BIN) tools/release/deploy.py
