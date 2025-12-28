// reactQueryMetrics.ts
import { queryClient } from "./queryClient";

let requestsCount = 0;

queryClient.getQueryCache().subscribe(event => {
  if (event?.type === "updated") {
    const query = event.query;

    if (query.state.fetchStatus === "fetching") {
      requestsCount++;
      console.log("[RQ request]", query.queryKey, "X =", requestsCount);
    }
  }
});

export const resetRequestsCount = () => {
  requestsCount = 0;
};

export const getRequestsCount = () => requestsCount;
