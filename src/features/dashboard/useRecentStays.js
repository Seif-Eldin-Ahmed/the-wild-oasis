import { useQuery } from "@tanstack/react-query";
import {
  subDays,
  differenceInCalendarDays,
} from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function getDaysSinceFirstStay(stays) {
  if (!stays?.length) return 1;

  const timestamps = stays
    .map((stay) => new Date(stay.startDate).getTime())
    .filter(Number.isFinite);

  if (!timestamps.length) return 1;

  const earliestDate = new Date(Math.min(...timestamps));

  return Math.max(
    1,
    differenceInCalendarDays(new Date(), earliestDate) + 1,
  );
}

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const selectedPeriod = searchParams.get("last") || "7";
  const isAllTime = selectedPeriod === "all";

  const selectedDays = isAllTime
    ? null
    : Number(selectedPeriod);

  const queryDate = isAllTime
    ? null
    : subDays(new Date(), selectedDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: [
      "stays",
      isAllTime ? "all-time" : `last-${selectedDays}`,
    ],
  });

  const confirmedStays = stays?.filter(
    (stay) =>
      stay.status === "checked-in" ||
      stay.status === "checked-out",
  );

  const numDays = isAllTime
    ? getDaysSinceFirstStay(confirmedStays)
    : selectedDays;

  return { isLoading, stays, confirmedStays, numDays };
}
