"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchProperties, fallbackPropertiesData } from "./api";

/**
 * Custom React hook that implements methods to fetch, refresh, and display
 * property data from the API with loading and error states.
 *
 * @param {Object} [initialData] - Initial properties data (e.g. from SSR)
 * @returns {{
 *   properties: Array,
 *   data: Object,
 *   isLoading: boolean,
 *   error: string|null,
 *   isLive: boolean,
 *   lastUpdated: Date|null,
 *   fetchAndDisplayProperties: (force?: boolean) => Promise<void>,
 * }}
 */
export function useProperties(initialData = null) {
  const hasInitial = Boolean(
    initialData && (
      (Array.isArray(initialData) && initialData.length > 0) ||
      (initialData.popularAds && initialData.popularAds.length > 0)
    )
  );

  const [data, setData] = useState(
    initialData && initialData.popularAds
      ? initialData
      : Array.isArray(initialData)
      ? { ...fallbackPropertiesData, popularAds: initialData }
      : fallbackPropertiesData
  );
  const [isLoading, setIsLoading] = useState(!hasInitial);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Method that fetches property listings from the internal API route
   * and updates component state to display the fetched data.
   */
  const fetchAndDisplayProperties = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchProperties({ forceRefresh });
      if (result) {
        setData(result);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err?.message || "Failed to load properties from API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount if no initial data was provided
  useEffect(() => {
    let ignore = false;

    if (!hasInitial) {
      const timer = setTimeout(async () => {
        try {
          const result = await fetchProperties({ forceRefresh: false });
          if (!ignore && result) {
            setData(result);
            setLastUpdated(new Date());
          }
        } catch (err) {
          if (!ignore) {
            setError(err?.message || "Failed to load properties from API");
          }
        } finally {
          if (!ignore) {
            setIsLoading(false);
          }
        }
      }, 0);

      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }
  }, [hasInitial]);

  const properties = data?.popularAds || fallbackPropertiesData.popularAds;
  const isLive = Boolean(data?.liveProperty || properties.some((p) => p?.isLive));

  return {
    properties,
    data,
    isLoading,
    error,
    isLive,
    lastUpdated,
    fetchAndDisplayProperties,
  };
}
