import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import {
  isDemoVisitor,
  rejectDemoMutation,
} from "../utils/demoMode";
import {
  demoBookings,
  getDemoBookings,
  getDemoBookingsAfterDate,
  getDemoStaysAfterDate,
  getDemoTodayActivity,
} from "./demoData";

export async function getBookings({
  filter,
  sortBy,
  page,
}) {
  if (await isDemoVisitor())
    return getDemoBookings({ filter, sortBy, page });
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" },
    );

  // FILTER
  if (filter)
    query = query[filter.method || "eq"](
      filter.field,
      filter.value,
    );

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}
export async function getBooking(id) {
  if (await isDemoVisitor()) {
    const booking = demoBookings.find(
      (row) => String(row.id) === String(id),
    );
    if (!booking) throw new Error("Booking not found");
    return booking;
  }
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// Date: ISOString
export async function getBookingsAfterDate(date) {
  if (await isDemoVisitor()) return getDemoBookingsAfterDate(date);
  let query = supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .lte("created_at", getToday({ end: true }));

  // Apply the starting date only when a specific period is selected.
  // When date is null, return all historical bookings.
  if (date) {
    query = query.gte("created_at", date);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  if (await isDemoVisitor()) return getDemoStaysAfterDate(date);
  let query = supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .lte("startDate", getToday());

  // When date is null, return all stays up to today.
  if (date) {
    query = query.gte("startDate", date);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  if (await isDemoVisitor()) return getDemoTodayActivity();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  await rejectDemoMutation();
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  await rejectDemoMutation();
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
