/**
 * Backdrop
 *
 * @author Sanjay Thiyagarajan
 */

( function ( mw, $ ) {
	'use strict';

	// Function to check the current focus of the user
	$.fn.isInViewport = function() {
		var elementTop = $( this ).offset().top;
		var elementBottom = elementTop + $( this ).outerHeight();

		var viewportTop = $( window ).scrollTop();
		var viewportBottom = viewportTop + $( window ).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$( function () {

		var $currentUsername = mw.config.get( 'wgUserName' );

		var $backDropRoot = $( '.backdrop' );
		if ( $backDropRoot.length ) {
			// Hide the configuration HTML
			$backDropRoot.parent().css( { 'display': 'none' } );

			// Add ID for hyperlinking to body
			$( '.mw-parser-output' ).attr( 'id', 'mw-parser-output' );

			$( '.mw-sidebar' ).css( 'margin-top', '4rem' );

			// Hide TOC
			$( '.mw-table-of-contents-container' ).css( {'display': 'none', 'position': 'absolute' } );

			$( '#siteSub' ).css( 'display', 'none' );

			// Change background of the viewport
			var $backgroundURL = $backDropRoot.attr( 'data-background' );
			if ( $backgroundURL !== undefined ) {
				$( 'body' ).css( { 'background': 'url("'+ $backgroundURL+'") no-repeat fixed center',
				'background-size': 'cover', 'background-attachment': 'fixed', 'width': '100vw', 'margin': 'unset',
				'padding-right': '10rem' } );
				$( '.mw-page-container-inner' ).css( { 'all': 'unset', 'background': 'transparent' } );
				$( '.mw-page-container' ).css( { 'background': 'transparent', 'width': '100vw', 'margin': 0, 
				'padding': 0 } );
				$( '.mw-workspace-container' ).css( 'margin', 'unset' );
				$( '.mw-content-container' ).css( { 'margin': 'unset' } );
				$( '#mw-content-text' ).css( { 'margin': 'unset' } );
				$( '.mw-header' ).css( { 'width': '100vw', 'padding': '0.5rem', 'position': 'fixed',
				'background': 'url("' + $backgroundURL + '") no-repeat fixed center', 'background-size': 'cover' } );
				$( '#content' ).css( { 'width': '100vw', 'padding': '0 2rem 0 1rem' } );
				$( '.mw-footer-container' ).css( { 'display': 'none' } );
				$( '#mw-panel' ).css( { 'position': 'fixed', 'z-index': 3 } );
			}
			// Hide controls if required and when there is no user currently logged in
			var $hideControl = $backDropRoot.attr( 'data-hidecontrol' );
			if ( $hideControl !== undefined && $currentUsername === null ) {
				$( '#right-navigation' ).css( 'display', 'none' );
				$( '.vector-user-links' ).css( 'display', 'none' );
				$( '.mw-article-toolbar-container' ).css( 'display', 'none' );
				$( '.mw-editsection' ).css( 'display', 'none' );

				// Move searchbar to the right
				$( '#p-search' ).css( { 'align-self': 'flex-end', 'position': 'absolute', 'top': 0, 'bottom': 0,
				'right': '8rem', 'margin-top': '1rem' } );
			}

			// Hide default page title
			var $pageTitle = $( '#firstHeading' ).text();
			$( '#firstHeading' ).css( 'display', 'none' );

			// Title styling
			var $titleStyle = { 'font-size': '3rem', 'display': 'flex', 'font-weight': 'bold', 'margin': '1rem' };
			var $titleColor = $backDropRoot.attr( 'data-titlecolor' );
			if ( $titleColor !== undefined ) {
				$titleStyle.color = $titleColor;
				$( '.mw-logo-wordmark' ).css( { 'color': $titleColor, 'font-size': '2rem' } );
			} else {
				$titleColor = 'auto';
			}
			// Remove bottom border from titles
			$( 'h1,h2,h3,h4,h5,h6' ).css( { 'border-bottom': 'none', 'font-weight': 'bold' } );

			// Modify infobox border
			$( 'table.infoboxTable' ).css( { 'border-radius': '1rem', 'padding': '30px', 'overflow': 'hidden' } );

			// Coverpage styling
			var $hasCover = $backDropRoot.attr( 'data-coverpage' );
			if ( $hasCover !== undefined ) {
				var $coverDiv = $( '<div></div>' );
				$coverDiv.attr( 'class', 'coverDiv' );
				$coverDiv.css( { 'height': '100vh', 'position': 'relative', 'width': '100%', 'display': 'flex',
				'flex-direction': 'column', 'flex-wrap': 'wrap' } );

				var $titleAndLogoDiv = $( '<div></div>' );
				$titleAndLogoDiv.css( { 'display': 'flex', 'flex-direction': 'row', 'width': '100vw', 'height': 'auto',
				'position': 'fixed', 'bottom': '0.5px', 'justify-content': 'space-between', 'z-index': '999',
				'background': 'url("' + $backgroundURL + '") no-repeat fixed center', 'background-size': 'cover' } );
				$titleAndLogoDiv.attr( 'id', 'titleAndLogoDiv' );
				
				var $titleGroup = $( '<div></div>' );
				$titleGroup.css( { 'display': 'flex', 'flex-direction': 'column', 'margin-left': '1rem',
				'color': $titleColor } );
				var $newTitle = $( '<p></p>' );
				$newTitle.text( $pageTitle );
				$newTitle.css( $titleStyle );
				$titleGroup.append( $newTitle );

				var $subTitle = $backDropRoot.attr( 'data-subtitle' );
				if ( $subTitle !== undefined ) {
					var $subTitleText = $( '<p></p>' );
					$subTitleText.text( $subTitle );
					$subTitleText.css( { 'font-size': '2rem', 'margin-top': '-1rem', 'margin-left': '1rem' } );
					$titleGroup.append( $subTitleText );
				}
				$titleAndLogoDiv.append( $titleGroup );

				// Page specific logo styling
				var $pageLogoField = $backDropRoot.attr( 'data-pagelogo' );
				if ( $pageLogoField !== undefined ) {
					var $pageLogo = $( '<img>' );
					$pageLogo.attr( 'class', 'pagelogo' );
					$pageLogo.attr( 'src', $pageLogoField );
					$pageLogo.css( { 'max-width': '15rem', 'max-height': '5rem', 'display': 'block',
					'margin-top': '1rem' } );
					$titleAndLogoDiv.append( $pageLogo );
				}
				$coverDiv.append( $titleAndLogoDiv );

				$coverDiv.insertBefore( $( '.mw-parser-output' ) );

				$( window ).scroll( function() {
					if ( $coverDiv.isInViewport() ) {
						// If cover page is in the focus currently
						$( '.mw-table-of-contents-container' ).css( 'display', 'none' );
					} else {
						// If body is in the focus
						$( '.mw-table-of-contents-container' ).css( { 'display': 'block', 'z-index': 4,
						'margin-top': '60rem' } );
						$( '.sidebar-toc' ).css( { 'border-radius': '2rem', 'margin-top': '4rem', 'position': 'absolute' } );
					}
				} );
			} else {
				// Show TOC always if there is no cover page
				$( '.mw-table-of-contents-container' ).css( { 'display': 'block', 'z-index': 4} );
				$( '.sidebar-toc' ).css( { 'border-radius': '2rem', 'margin-top': '20rem' } );
			}

			var $bodyColor = $backDropRoot.attr( 'data-body-bgcolor' );
			if ( $bodyColor === undefined ) {
				$bodyColor = '#f8f9fa';
			}
			
			var $textColor = $backDropRoot.attr( 'data-content-textcolor' );
			if ( $textColor === undefined ) {
				$textColor = 'auto';
			}
			
			var defaultWidth = 'auto';
			$( '.mw-parser-output' ).css( { 'border-radius': '2rem', 'background': $bodyColor,
			'overflow-wrap': 'break-word', 'padding': '1rem', 'margin': '1rem', 'width': defaultWidth,
			'color': $textColor, 'margin-left': '15rem', 'margin-bottom': $( '#titleAndLogoDiv' ).height() } );
		}
	} );

}( mediaWiki, jQuery ) );
