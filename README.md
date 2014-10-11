pushme.js
======

This small but might really useful [jQuery](http://www.jquery.com) Plugin makes possible to push elements into specific containers depended on certain media queries.

###Demo
Check out a short example of the pushme.js:<br>
http://jsfiddle.net/v9tWd/2/

###Installation
Just include the `pushme.js` and initialize it for your elements.
Note: Also make sure that jQuery is defined.

```
<script type="text/javascript" src="path/to/your/push.js"></script>
$(window).on('resize', function() {
	$('yourElement').pushme('init', {
		element: '.pushtome',
		pushAction: 'prependTo',
		mq: 'screen and (max-width:767px)'
	});
});
```
