import { useQuery } from "@tanstack/react-query";
import {
  subDays,
  differenceInCalendarDays,
} from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function getDaysSinceFirstRecord(records) {
  if (!records?.length) return 1;

  const timestamps = records
    .map((record) => new Date(record.created_at).getTime())
    .filter(Number.isFinite);

  if (!timestamps.length) return 1;

  const earliestDate = new Date(Math.min(...timestamps));

  return Math.max(
    1,
    differenceInCalendarDays(new Date(), earliestDate) + 1,
  );
}

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const selectedPeriod = searchParams.get("last") || "all";
  const isAllTime = selectedPeriod === "all";

  const selectedDays = isAllTime
    ? null
    : Number(selectedPeriod);

  const queryDate = isAllTime
    ? null
    : subDays(new Date(), selectedDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: [
      "bookings",
      isAllTime ? "all-time" : `last-${selectedDays}`,
    ],
  });

  const numDays = isAllTime
    ? getDaysSinceFirstRecord(bookings)
    : selectedDays;

  return { isLoading, bookings, numDays };
}
