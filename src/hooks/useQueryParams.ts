"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "../navigation";

/**
 * Utility to work with query parameters in Next.js.
 * Provides methods to get an object from query parameters
 * and create a query string from an object.
 */
export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  /**
   * Retrieves query parameters as an object.
   * @returns {Object} The query parameters as a key-value object.
   */
  const getQueryObject = () => {
    if (typeof window === "undefined") return {}; // Prevents server-side execution

    const params = new URLSearchParams(searchParams?.toString() || "");
    const queryObject: Record<string, any> = {}; // Properly initialized

    params.forEach((value, key) => {
      // Convert value to the appropriate type
      if (value === "true") {
        queryObject[key] = true; // Parse as boolean
      } else if (value === "false") {
        queryObject[key] = false; // Parse as boolean
      } else if (!isNaN(Number(value))) {
        queryObject[key] = Number(value); // Parse as number if possible
      } else {
        queryObject[key] = value; // Keep as string for everything else
      }
    });

    return queryObject;
  };

  /**
   * Creates a query string from an object and updates the URL.
   * @param {Object} queryObject - The object to convert to a query string.
   */
  const createQueryFromObject = (
    queryObject: Record<string, any>,
    pathName?: string
  ) => {
    // Initialize with existing query parameters
    const params = new URLSearchParams(searchParams?.toString());

    // Update or add new parameters from the provided object
    Object.entries(queryObject).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value.toString() !== "") {
        params.set(key, value.toString());
      } else {
        // Remove the parameter if the value is null or undefined
        params.delete(key);
      }
    });

    // Convert to string and update the URL
    if (pathName) {
      const queryString = params.toString();
      router.push(`${pathName}?${queryString}`, { scroll: false });
    } else {
      const queryString = params.toString();
      router.push(`?${queryString}`, { scroll: false });
    }
  };

  /**
   * Modifies the query parameters in the URL.
   * If a key is provided, it removes that specific query parameter.
   * If no key is provided, it clears all query parameters.
   * Updates the URL with the modified query parameters without scrolling.
   *
   * @param {string | Array<string>} [key] - The specific key(s) of the query parameter to remove. If not provided, all query parameters are removed.
   */
  const modifyQueryParams = (key?: string | Array<string>) => {
    const params = new URLSearchParams(searchParams?.toString());
    const currentPath = pathName;

    if (key) {
      // Remove specific key(s)
      const keys = Array.isArray(key) ? key : [key];
      keys.forEach((k) => params.delete(k));

      const newQueryString = params.toString();

      router.push(
        newQueryString ? `${currentPath}?${newQueryString}` : currentPath,
        {
          scroll: false,
        }
      );
    } else {
      // Clear all query parameters
      router.push(currentPath, { scroll: false });
    }
  };

  const clearAll = () => {
    router.push(`${pathName}`, { scroll: false });
  };

  const updatePaginationQuery = ({
    page,
    pageSize,
  }: {
    pageSize?: string;
    page?: string;
  }) => {
    const params = new URLSearchParams(searchParams?.toString());

    // Get current values or set defaults
    const currentPageSize = pageSize ?? (Number(params.get("pageSize")) || 10);
    const currentPage = page ?? (Number(params.get("page")) || 1);

    // Calculate new values
    const skip = (Number(currentPage) - 1) * Number(currentPageSize);
    const take = currentPageSize;

    // Update parameters
    params.set("pageSize", currentPageSize.toString());
    params.set("skip", skip.toString());
    params.set("take", take.toString());

    // Push updated query to the router
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    getQueryObject,
    createQueryFromObject,
    modifyQueryParams,
    updatePaginationQuery,
    clearAll,
  };
};
