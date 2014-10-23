/**
 * pushme.js - jQuery Plugin
 * Push elements into specific containers depended on certain media queries
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 * @version			2.1.0 (23/10/2014)
 */

;(function($) {

	var pushme = {

		labels: {
			log: {
				pushed: ' was pushed to ',
				mediaQueriesNotSupported: 'Your browser does not support media queries.'
			},
			error: {
				notFound: ' could not get found.'
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
			log: false
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The custom plugin options (Not yet merged with default settings)
		 * @return	{boolean}			True if operation proceeded, else false
		 */
		init: function (options) {
			var settings = $.extend(pushme.settings, options);

			if (pushme.checkPrerequisites(this, settings) === true) {
				pushme.pushTo(this, settings);
				return true;
			} else {
				return false;
			}
		},

		/**
		 * Pushes the element to somewhere
		 *
		 * @param	{object}	$object		The element that should be pushed
		 * @param	{object}	settings	All custom plugin settings
		 * @return	{void}
		 */
		pushTo: function ($object, settings) {
			if (pushme.matchMedia()(settings.mq).matches) {
				$object[settings.pushAction]($(settings.element));

				if (settings.log === true) {
					console.log(
						$object.selector + pushme.labels.log.pushed + settings.element +
						' (action: ' + settings.pushAction + ', mq: ' + settings.mq + ')'
					);
				}
			}
		},

		/**
		 * Returns the supported match media
		 *
		 * @return	{mixed}	The supported media query or undefined if the browser doesn't support match media
		 */
		matchMedia: function() {
			return window.matchMedia || window.msMatchMedia;
		},

		/**
		 * Checks if all prerequisites are given
		 *
		 * @param	{object}	$object		The object to check if it exists
		 * @param	{object}	settings	All custom plugin settings (Merged with default settings)
		 * @return	{boolean}				True if all checks were passed, else false
		 */
		checkPrerequisites: function ($object, settings) {
			if (typeof pushme.matchMedia() !== 'function') {
				if (settings.log === true) {
					console.log(pushme.labels.log.mediaQueriesNotSupported);
				}
				return false;
			}
			if ($(settings.element).length < 1) {
				if (settings.log === true) {
					console.log(settings.element + pushme.labels.error.notFound);
				}
				return false;
			}
			if ($object.length < 1) {
				throw new ReferenceError($object.selector + pushme.labels.error.notFound);
			}

			return true;
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

})(jQuery);