COMPRESSOR = yui-compressor

%.css: %.css.uncompressed.css
	$(COMPRESSOR) -o $@ $<

all: animate.css jquery.bxslider.css owl.carousel.css simple-line-icons.css slidebars.css style.css
.PHONY: all

clean:
	$(RM) animate.css jquery.bxslider.css owl.carousel.css simple-line-icons.css slidebars.css style.css

