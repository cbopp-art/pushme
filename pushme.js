/**
 * pushme.js - jQuery Plugin
 * Push elements into specific containers depended on certain media queries
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * 					Modernizr v2.7.1 http://modernizr.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 * @version			2.0.1 (14/10/2014)
 */

;(function($) {

	var pushme = {

		labels: {
			log: {
				pushed: ' was pushed to '
			},
			error: {
				notFound: ' could not get found.',
				notTypeOfObject: 'The element you want to push is not typeof object.',
				modernizrNotFound: 'Modernizr is not defined.'
			}
		},

		/**
		 * Default settings
		 *
		 */
		settings: {
			element: '#example',
			pushAction: 'appendTo',
			mq: 'screen and (min-width:768px)',
			log: true
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The custom plugin options (Not yet merged with default settings)
		 * @return	{void}
		 */
		init: function (options) {
			var $this = $(this),
				settings = $.extend(pushme.settings, options);

			pushme.checkPrerequisites($this, settings);
			pushme.pushTo($this, settings);
		},

		/**
		 * Pushes the element to somewhere
		 *
		 * @param	{object}	$object		The element that should be pushed
		 * @param	{object}	settings	All custom plugin settings
		 * @return	{void}
		 */
		pushTo: function ($object, settings) {
			if (Modernizr.mq(settings.mq)) {
				$object[settings.pushAction]($(settings.element));

				if (settings.log === true) {
					console.log($object.selector + pushme.labels.log.pushed + settings.element + ' (' + settings.pushAction + ')');
				}
			}
		},

		/**
		 * Checks if all prerequisites are given
		 *
		 * @param	{object}	$object		The object to check if it exists
		 * @param	{object}	settings	All custom plugin settings (Merged with default settings)
		 * @return	{void}
		 */
		checkPrerequisites: function ($object, settings) {
			if (typeof Modernizr === 'undefined') {
				throw new ReferenceError(pushme.labels.error.modernizrNotFound);
			}
			if (typeof $object !== 'object') {
				throw new ReferenceError(pushme.labels.notTypeOfObject);
			}
			if (typeof $(settings.element) !== 'object') {
				throw new ReferenceError(settings.element + pushme.labels.error.notFound);
			}
		}

	};

	$.fn.pushme = function (method) {
		if (pushme[method]) {
			return pushme[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) {
			return pushme.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' + method + ' does not exist on jQuery.pushme');
		}
	};

}(jQuery));
