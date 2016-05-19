(function() {
	var charWidth = 6;
	var charHeight = 10;
	var likelihoodOfReplacingWord = 0.05;
	var likelihoodOfChangingExistingText = 0.1;

	function randomChoice(x) {
		return x[Math.floor(Math.random() * x.length)];
	}
	
	function initElement(element) {
		var img = new Image();
		img.onload = function() {
			render(element, img, null);
		}
		img.src = element.getAttribute('data-letter-crap');
	}
	
	function getTextContentWithImageAtSize(image, width, height, existingText, words, letters) {
		existingText = existingText ? existingText.replace(/\r?\n|\r/g, '') : null;
		var shouldReplaceExisting = function() { return !existingText || Math.random() < likelihoodOfChangingExistingText };
		
		var canvas = document.createElement('canvas');
		canvas.width = parseInt(width / charWidth);
		canvas.height = parseInt(height / charHeight);
		canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
		var data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
		var chars = "";
		var startOfFilledInSequence = 0;
		var i = 0;
		for (var y=0; y<data.height; y++) {
			for (var x=0; x<data.width; x++) {
				var black = data.data[i*4] < 120;
				var transparent = data.data[i*4+3] < 50; 
				if (black && !transparent) {
					if (startOfFilledInSequence === null) startOfFilledInSequence = i;
					
					if (shouldReplaceExisting()) {
						chars += randomChoice(letters);
					} else {
						chars += existingText[i];
					}
					
					if (words.length > 0 && Math.random() < likelihoodOfReplacingWord && shouldReplaceExisting()) {
						var word = randomChoice(words);
						if (i + 1 - startOfFilledInSequence >= word.length) {
							chars = chars.substring(0, chars.length - word.length) + word;
						}
					}
				} else {
					chars += " ";
					startOfFilledInSequence = null;
				}
				i++;
			}
			chars += "\n";
			startOfFilledInSequence = null;
		}
		return chars
	}
	
	function render(element, image, prev) {
		if (element.hasAttribute('data-lettercrap-aspect-ratio')) {
			var aspect = parseFloat(element.getAttribute('data-lettercrap-aspect-ratio'));
			element.style.height = element.clientWidth * aspect + 'px';
		}
		var text;
		var words = element.hasAttribute('data-lettercrap-words') ? element.getAttribute('data-lettercrap-words').split(' ') : [];
		var letters = element.hasAttribute('data-lettercrap-letters') ? element.getAttribute('data-lettercrap-letters') : '0101010101_';
		if (prev && prev.width == element.clientWidth && prev.height == element.clientHeight) {
			text = getTextContentWithImageAtSize(image, element.clientWidth, element.clientHeight, prev.text, words, letters);
		} else {
			text = getTextContentWithImageAtSize(image, element.clientWidth, element.clientHeight, null, words, letters);
		}
		element.textContent = text;
		var data = {width: element.clientWidth, height: element.clientHeight, text: text};
		setTimeout(function() {
			render(element, image, data);
		}, 150);
	}
	
	document.addEventListener('DOMContentLoaded', function() {
		var elements = document.querySelectorAll('[data-letter-crap]');
		for (var i=0; i<elements.length; i++) {
			initElement(elements[i]);
		}
	})
})()
