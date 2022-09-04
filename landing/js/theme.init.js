// Commom Plugins
( function ( $ ) {

	'use strict';

	// Scroll to Top Button.
	if ( typeof theme.PluginScrollToTop !== 'undefined' ) {
		theme.PluginScrollToTop.initialize();
	}

	// Tooltips
	if ( $.isFunction( $.fn[ 'tooltip' ] ) ) {
		$( '[data-tooltip]:not(.manual), [data-plugin-tooltip]:not(.manual)' ).tooltip();
	}

	// Popover
	if ( $.isFunction( $.fn[ 'popover' ] ) ) {
		$( function () {
			$( '[data-plugin-popover]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.popover( opts );
			} );
		} );
	}

	// Validations
	if ( typeof theme.PluginValidation !== 'undefined' ) {
		theme.PluginValidation.initialize();
	}

	// Match Height
	if ( $.isFunction( $.fn[ 'matchHeight' ] ) ) {

		$( '.match-height' ).matchHeight();

		// Featured Boxes
		$( '.featured-boxes .featured-box' ).matchHeight();

		// Featured Box Full
		$( '.featured-box-full' ).matchHeight();

	}

} ).apply( this, [ jQuery ] );

// Animate
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginAnimate' ] ) ) {

		$( function () {
			$( '[data-appear-animation]' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginAnimate( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Before / After
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginBeforeAfter' ] ) ) {

		$( function () {
			$( '[data-plugin-before-after]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginBeforeAfter( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Carousel
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginCarousel' ] ) ) {

		$( function () {
			$( '[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginCarousel( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Counter
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginCounter' ] ) ) {

		$( function () {
			$( '[data-plugin-counter]:not(.manual), .counters [data-to]' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginCounter( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Animated Icon
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginIcon' ] ) ) {

		$( document ).ready( function () {
			$( function () {

				$( '[data-icon]:not(.svg-inline--fa)' ).each( function () {
					var $this = $( this ),
						opts;

					var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
					if ( pluginOptions )
						opts = pluginOptions;

					$this.themePluginIcon( opts );
				} );

			} );
		} );
	}

} ).apply( this, [ jQuery ] );

// Lazy Load
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginLazyLoad' ] ) ) {

		$( function () {
			$( '[data-plugin-lazyload]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginLazyLoad( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Masonry
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginMasonry' ] ) ) {

		$( function () {
			$( '[data-plugin-masonry]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginMasonry( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Match Height
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginMatchHeight' ] ) ) {

		$( function () {
			$( '[data-plugin-match-height]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginMatchHeight( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Scrollable
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'nanoScroller' ] ) ) {

		$( function () {
			$( '[data-plugin-scrollable]' ).each( function () {
				var $this = $( this ),
					opts = {};

				var pluginOptions = $this.data( 'plugin-options' );
				if ( pluginOptions ) {
					opts = pluginOptions;
				}

				$this.themePluginScrollable( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Section Scroll
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginSectionScroll' ] ) ) {

		$( function () {
			$( '[data-plugin-section-scroll]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginSectionScroll( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Sort
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginSort' ] ) ) {

		$( function () {
			$( '[data-plugin-sort]:not(.manual), .sort-source:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginSort( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Star Rating
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginStarRating' ] ) ) {

		$( function () {
			$( '[data-plugin-star-rating]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginStarRating( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Sticky
( function ( $ ) {

	'use strict';

	if ( $.isFunction( $.fn[ 'themePluginSticky' ] ) ) {

		$( function () {
			$( '[data-plugin-sticky]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = theme.fn.getOptions( $this.data( 'plugin-options' ) );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.themePluginSticky( opts );
			} );
		} );

	}

} ).apply( this, [ jQuery ] );

// Sticky
( function ( $ ) {
	'use strict';
	if ( $.isFunction( $.fn[ 'themePluginFloatElement' ] ) ) {
		$( function () {
			$( 'body' ).find( '[data-plugin-float-element]:not(.manual)' ).each( function () {
				var $this = $( this ),
					opts;

				var pluginOptions = $this.data( 'plugin-options' );
				if ( pluginOptions )
					opts = pluginOptions;
				if ( typeof opts == 'string' ) {
					try {
						opts = JSON.parse( opts.replace( /'/g, '"' ).replace( ';', '' ) );
					} catch ( e ) { }
				}

				$this.themePluginFloatElement( opts );
			} );
		} );
	}

} ).apply( this, [ jQuery ] );

// Commom Partials
( function ( $ ) {

	'use strict';

	// Sticky Header
	if ( typeof theme.StickyHeader !== 'undefined' ) {
		theme.StickyHeader.initialize();
	}

	// Nav Menu
	if ( typeof theme.Nav !== 'undefined' ) {
		theme.Nav.initialize();
	}

	// Search
	if ( typeof theme.Search !== 'undefined' ) {
		theme.Search.initialize();
	}

	// Newsletter
	if ( typeof theme.Newsletter !== 'undefined' ) {
		theme.Newsletter.initialize();
	}

	// Account
	if ( typeof theme.Account !== 'undefined' ) {
		theme.Account.initialize();
	}

} ).apply( this, [ jQuery ] );