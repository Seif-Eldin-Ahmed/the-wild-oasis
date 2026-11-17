import { cabins as sourceCabins } from "../data/data-cabins";
import { add } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";

const cabinImages = import.meta.glob("../data/cabins/*.jpg", {
  eager: true,
  import: "default",
});

export const demoCabins = sourceCabins.map((cabin, index) => ({
  ...cabin,
  id: index + 1,
  image: cabinImages[`../data/cabins/cabin-${String(index + 1).padStart(3, "0")}.jpg`],
}));

function dayOffset(offset, withTime = false) {
  const date = add(new Date(), { days: offset });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const demoBookings = Array.from({ length: 24 }, (_, index) => {
  const cabinId = (index % demoCabins.length) + 1;
  const cabin = demoCabins[cabinId - 1];
  const startOffset = [-12, -5, -1, 0, 3, 8, 14, 22][index % 8];
  const stayLength = 2 + (index % 7);
  const booking = {
    created_at: dayOffset(startOffset - 9, true),
    startDate: dayOffset(startOffset),
    endDate: dayOffset(startOffset + stayLength),
    cabinId,
    hasBreakfast: index % 2 === 0,
    isPaid: index % 3 !== 0,
    numGuests: Math.min(cabin.maxCapacity, 1 + (index % cabin.maxCapacity)),
  };
  const guest = {
    fullName: `Demo Guest ${String(index + 1).padStart(2, "0")}`,
    email: "guest@example.invalid",
    nationality: "Demo",
    countryFlag: "",
    nationalID: "Not provided",
  };
  const numNights = stayLength;
  const cabinPrice = (cabin.regularPrice - cabin.discount) * numNights;
  const extrasPrice = booking.hasBreakfast ? 15 * numNights * booking.numGuests : 0;
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);

  return {
    ...booking,
    id: index + 1,
    numNights,
    status: start > new Date() ? "unconfirmed" : end > new Date() ? "checked-in" : "checked-out",
    cabinPrice,
    extrasPrice,
    totalPrice: cabinPrice + extrasPrice,
    observations: "",
    guests: guest,
    cabins: cabin,
  };
});

export const demoSettings = {
  minBookingLength: 3,
  maxBookingLength: 30,
  maxGuestsPerBooking: 10,
  breakfastPrice: 15,
};

export function getDemoBookings({ filter, sortBy, page } = {}) {
  let rows = [...demoBookings];
  if (filter) rows = rows.filter((row) => row[filter.field] === filter.value);
  if (sortBy) rows.sort((a, b) => (a[sortBy.field] > b[sortBy.field] ? 1 : -1) * (sortBy.direction === "asc" ? 1 : -1));
  const count = rows.length;
  if (page) rows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return { data: rows, count };
}

export function getDemoBookingsAfterDate(date) {
  const today = getToday({ end: true });
  return demoBookings.filter((booking) => booking.created_at <= today && (!date || booking.created_at >= date));
}

export function getDemoStaysAfterDate(date) {
  const today = getToday();
  return demoBookings.filter((booking) => booking.startDate <= today && (!date || booking.startDate >= date));
}

export function getDemoTodayActivity() {
  const today = getToday();
  return demoBookings.filter((booking) => (booking.status === "unconfirmed" && booking.startDate === today) || (booking.status === "checked-in" && booking.endDate === today));
}
