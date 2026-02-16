.PHONY: serve build clean install restart

serve:
	bundle exec jekyll serve --livereload

build:
	bundle exec jekyll build

install:
	bundle config set --local path vendor/bundle
	bundle install

clean:
	rm -rf _site .jekyll-cache .bundle

restart:
	make clean
	make serve
