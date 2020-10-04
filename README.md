# Lettercrap

_Lettercrap_ is a Javascript library that generates dynamic ascii art on the web, using an image mask. It looks like this:

<img src="https://raw.githubusercontent.com/nate-parrott/lettercrap/gh-pages/crap.gif" width="400px">

[Here's a live demo.](https://nate-parrott.github.io/lettercrap)

## Usage

To use _Lettercrap_, import `lettercrap.js` and `lettercrap.css`. Create a `div` with the `data-letter-crap` 
attribute with the source of a black-and-white image, which will serve as the shape of the generated ascii art:

	<div data-letter-crap='abcs.png' style='width: 500px; height: 200px'></div>

Make sure to set a height for your `div`. If you want to set a dynamic height based on the div's fluid width, 
you can specify an aspect ratio using the `data-lettercrap-aspect-ratio` attribute, and _Lettercrap_ will set the height of the `div` for you:

	<div data-letter-crap='abcs.png' style='width: 70%' data-lettercrap-aspect-ratio='0.5'></div>

By default, _Lettercrap_ uses `0`s, `1`s and the occasional `_` to fill in the shape of your image. You can 
change the set of letters used with the `data-lettercrap-letters` attribute:

	<div data-letter-crap='abcs.png' data-lettercrap-letters='ABC'></div>

_Lettercrap_ can also throw the occasional _full word_ into the mix—specify the words to choose from using 
the `data-lettercrap-words` attribute:

	<div data-letter-crap='words.png' data-lettercrap-words='apple banana peach'></div>

_Lettercrap_ allows you to generate a canvas from text if you don't want to generate an image beforehand
with the `data-lettercrap-text` attribute:

	<div data-lettercrap-text='CHECK IT OUT' data-lettercrap-aspect-ratio='0.3'></div>

Check out the `examples/index.html` file to see exactly how this all fits together.

## Development
To get the example working locally, you need to host it on localhost somehow. This is due to the security
features involved with pulling images from local storage, unfortunately. 

Here are a few of the commands that work, depending on what software you have in your environment. Just
be sure to run them from the lettercrap folder, not the example folder:
- PHP: `php -S localhost:8080`
- Python 2: `python -m SimpleHTTPServer 8080`
- Python 3: `python -m http.server 8080`
- Node.js: `npm install http-server -g` then `http-server`

Then visit `http://localhost:8080/example` to see it in action.
