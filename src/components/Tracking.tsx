"use client";
import Hotjar from "@hotjar/browser";
import Script from "next/script";
import { useEffect } from "react";

const siteId = 3733109;
const hotjarVersion = 6;

const Tracking: React.FC = () => {
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1774956386278965');
    fbq('track', 'PageView');
    `,
      }}
    />
  );
};

export default Tracking;
