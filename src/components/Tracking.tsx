"use client";
import Hotjar from "@hotjar/browser";
import { useEffect } from "react";

const siteId = 3733109;
const hotjarVersion = 6;

const Tracking: React.FC = () => {
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return null;
};

export default Tracking;
