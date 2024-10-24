// -- VARIABLES

export var
    googleAnalyticsTrackingId = '',
    googleAnalyticsTrackingIsEnabled = false,
    googleAnalyticsTrackingScript = null,
    googleTagManagerTrackingId = '',
    googleTagManagerTrackingIsEnabled = false,
    googleTagManagerTrackingScript = null;

// -- FUNCTIONS

export function setPerformanceCookieConsent(
    hasPerformanceCookieConsent
    )
{
    localStorage.setItem(
        'hasPerformanceCookieConsent',
        hasPerformanceCookieConsent ? 'true' : 'false'
        );
}

// ~~

export function hasPerformanceCookieConsent(
    )
{
    return localStorage.getItem( 'hasPerformanceCookieConsent' ) === 'true';
}

// ~~

export function setFunctionalCookieConsent(
    hasFunctionalCookieConsent
    )
{
    localStorage.setItem(
        'hasFunctionalCookieConsent',
        hasFunctionalCookieConsent ? 'true' : 'false'
        );
}

// ~~

export function hasFunctionalCookieConsent(
    )
{
    return localStorage.getItem( 'hasFunctionalCookieConsent' ) === 'true';
}

// ~~

export function setTargetingCookieConsent( hasTargetingCookieConsent )
{
    localStorage.setItem(
        'hasTargetingCookieConsent',
        hasTargetingCookieConsent ? 'true' : 'false'
        );
}

// ~~

export function hasTargetingCookieConsent()
{
    return localStorage.getItem( 'hasTargetingCookieConsent' ) === 'true';
}

// ~~

export function hasCookieConsent()
{
    return (
        hasPerformanceCookieConsent()
        || hasFunctionalCookieConsent()
        || hasTargetingCookieConsent()
        );
}

// ~~

function gtag(
    )
{
    window.dataLayer.push( arguments );
}

// ~~

export function trackRoute(
    )
{
    if ( googleAnalyticsTrackingIsEnabled )
    {
        gtag(
            'config',
            googleAnalyticsTrackingId,
            {
                'page_title' : window.location.pathname,
                'page_path' : window.location.pathname,
                'page_location' : window.location.href
            }
            );
    }

    if ( googleTagManagerTrackingIsEnabled )
    {
        window.dataLayer.push(
            {
                'event' : 'page_view',
                'page_title' : document.title,
                'page_path' : window.location.pathname,
                'page_location' : window.location.href
            }
            );
    }
}

// ~~

export function enableGoogleAnalyticsTracking(
    trackingId
    )
{
    if ( !googleAnalyticsTrackingIsEnabled )
    {
        googleAnalyticsTrackingIsEnabled = true;
        googleAnalyticsTrackingId = trackingId;

        window.dataLayer = window.dataLayer || [];

        googleAnalyticsTrackingScript = document.createElement( 'script' );
        googleAnalyticsTrackingScript.async = true;
        googleAnalyticsTrackingScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackingId;

        document.head.insertBefore( googleAnalyticsTrackingScript, document.head.firstChild );

        gtag( 'js', new Date() );
        gtag( 'config', trackingId );

        trackRoute();
    }
}

// ~~

export function disableGoogleAnalyticsTracking(
    trackingId
    )
{
    if ( googleAnalyticsTrackingIsEnabled
         && googleAnalyticsTrackingId === trackingId )
    {
        if ( googleAnalyticsTrackingScript !== null
             && document.head.contains( googleAnalyticsTrackingScript ) )
        {
            document.head.removeChild( googleAnalyticsTrackingScript );
        }

        window.dataLayer = [];

        googleAnalyticsTrackingIsEnabled = false;
        googleAnalyticsTrackingId = '';
        googleAnalyticsTrackingScript = null;
    }
}

// ~~

export function enableGoogleTagManagerTracking(
    trackingId
    )
{
    if ( !googleTagManagerTrackingIsEnabled )
    {
        googleTagManagerTrackingIsEnabled = true;
        googleTagManagerTrackingId = trackingId;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(
            {
                'gtm.start' : new Date().getTime(),
                event: 'gtm.js'
            }
            );

        googleTagManagerTrackingScript = document.createElement( 'script' );
        googleTagManagerTrackingScript.async = true;
        googleTagManagerTrackingScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + trackingId;

        document.head.insertBefore( googleTagManagerTrackingScript, document.head.firstChild );

        trackRoute();
    }
}

// ~~

export function disableGoogleTagManagerTracking(
    trackingId
    )
{
    if ( googleTagManagerTrackingIsEnabled
         && googleTagManagerTrackingId === trackingId )
    {
        if ( googleTagManagerTrackingScript !== null
             && document.head.contains( googleTagManagerTrackingScript ) )
        {
            document.head.removeChild( googleTagManagerTrackingScript );
        }

        window.dataLayer = [];

        googleTagManagerTrackingIsEnabled = false;
        googleTagManagerTrackingId = '';
        googleTagManagerTrackingScript = null;
    }
}
